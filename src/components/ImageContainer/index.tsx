import Image from "next/image";

interface ImageContainerProps {
    src?: string;
    srcs?: string[];
    alt?: string;
    alts?: string[];
    subtitle?: string;
}

export default async function (props: ImageContainerProps) {
    return (
        <>
            {props.src && (
                <div className="relative w-full rounded overflow-clip shadow-md">
                    <img src={props.src} alt={props.alt ?? ""} width={1000} height={900} className="w-full h-auto object-fill m-0" />
                </div>
            )}
            {props.srcs && (
                <div className="flex gap-4 flex-col md:flex-row">
                    {props.srcs.map((src, index) => (
                        <div className="relative w-full rounded overflow-clip shadow-md">
                            <img key={index} src={src} alt={props.alts?.[index] ?? ""} width={1000} height={900} className="w-full h-auto object-fill m-0" />
                        </div>
                    ))}
                </div>
            )}
            {props.subtitle && <p className="opacity-90 text-sm w-full text-center">{props.subtitle}</p>}
        </>
    );
}
