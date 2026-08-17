import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Image, Text } from "react-native";

const downloadImage = async (
    bucket: string,
    path: string,
    transform: {width:number; height:number} | undefined
): Promise<string> => {
    const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error("No image data returned");
    }

    const fr = new FileReader();

    return new Promise((resolve, reject) => {
        fr.onload = () => {
            resolve(fr.result as string);
        };

        fr.onerror = () => {
            reject(new Error("Failed to read image"));
        };

        fr.readAsDataURL(data);
    });
};


export default function SupabaseImage({
    bucket,
    path,
    className,
    transform
    
}: {
    bucket: string;
    path: string;
    className: string;
    transform: {width:number; height:number} | undefined

}) {
    const {data, isLoading, error} = useQuery({
        queryKey: ['supabaseImage', path],
        queryFn: () => downloadImage (bucket, path ,transform) 
           
    });

 if (isLoading) return <ActivityIndicator />;
 if (error) return <Text className='text-white'>Error: {error.message} </Text>
 


return (
    <Image 
       source={{
        uri: data,
       }}
       className={className}
    />
)

}