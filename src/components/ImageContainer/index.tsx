import Image from "next/image";
import useBase64Image from "@/hooks/useBase64Image";

interface ImageContainerProps {
    src?: string;
    srcs?: string[];
    alt?: string;
    alts?: string[];
    subtitle?: string;
}

export default async function (props: ImageContainerProps) {
    let blurData: any;

    if (props.src) {
        blurData = await useBase64Image(props.src);
    } else if (props.srcs && props.srcs?.length > 0) {
        blurData = await Promise.all(props.srcs.map((src) => useBase64Image(src)));
    }

    return (
        <>
            {props.src && props.alt && (
                <div className="relative w-full rounded overflow-clip shadow-md">
                    <Image src={props.src} alt={props.alt} width={1000} height={900} placeholder="blur" blurDataURL={blurData} className="w-full h-auto object-fill m-0" />
                </div>
            )}
            {props.srcs && props.alts && (
                <div className="flex gap-4 flex-col md:flex-row">
                    {props.srcs.map((src, index) => (
                        <div className="relative w-full rounded overflow-clip shadow-md">
                            <Image
                                key={index}
                                src={src}
                                alt={props.alts?.[index] ?? ""}
                                width={1000}
                                height={900}
                                placeholder="blur"
                                blurDataURL={blurData[index]}
                                className="w-full h-auto object-fill m-0"
                            />
                        </div>
                    ))}
                </div>
            )}
            {props.subtitle && <p className="opacity-90 text-sm w-full text-center">{props.subtitle}</p>}
        </>
    );
}
