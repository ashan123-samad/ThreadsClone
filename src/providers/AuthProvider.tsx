
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ActivityIndicator, Text, View } from "react-native";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsReady(true);
      setIsLoading(false);
      return;
    }

    const supabase = getSupabase();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsReady(true);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // IMPORTANT: useMemo must run on every render.
  // It must be above all conditional returns.
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!session,
    }),
    [session, user]
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black px-6">
        <Text className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
          Supabase not configured
        </Text>

        <Text className="text-base text-gray-500 dark:text-gray-400 text-center mb-4">
          Edit the `.env` file in your project root and paste your real
          Supabase credentials. Spelling must be exact:
        </Text>

        <Text className="text-sm font-mono text-gray-700 dark:text-gray-300 text-center mb-1">
          EXPO_PUBLIC_SUPABASE_URL
        </Text>

        <Text className="text-sm font-mono text-gray-700 dark:text-gray-300 text-center mb-4">
          EXPO_PUBLIC_SUPABASE_ANON_KEY
        </Text>

        <Text className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Supabase Dashboard → Project Settings → API → Project URL and anon
          public key.
          {"\n\n"}
          Save `.env`, stop Expo (Ctrl+C), then run: npm run start:clear
        </Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

