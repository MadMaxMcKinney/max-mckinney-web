import Image from "next/image";

interface ImageContainerProps {
    src?: string;
    srcs?: string[];
    alt?: string;
    alts?: string[];
    subtitle?: string;
}

export default function (props: ImageContainerProps) {
    return (
        <>
            {props.src && props.alt && (
                <div className="relative w-full rounded overflow-clip shadow-md">
                    <Image src={props.src} alt={props.alt} width={1100} height={900} className="w-full h-auto object-fill m-0" />
                </div>
            )}
            {props.srcs && props.alts && (
                <div className="flex gap-4 flex-col md:flex-row">
                    {props.srcs.map((src, index) => (
                        <div className="relative w-full rounded overflow-clip shadow-md">
                            <Image key={index} src={src} alt={props.alts?.[index] ?? ""} width={1100} height={900} className="w-full h-auto object-fill m-0" />
                        </div>
                    ))}
                </div>
            )}
            {props.subtitle && <p className="opacity-90 text-sm w-full text-center">{props.subtitle}</p>}
        </>
    );
}
