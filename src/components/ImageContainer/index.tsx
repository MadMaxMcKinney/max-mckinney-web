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
                    <Image src={props.src} alt={props.alt ?? ""} width={1400} height={1400} className="w-full h-auto" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px" />
                </div>
            )}
            {props.srcs && (
                <div className="flex gap-4 flex-col md:flex-row">
                    {props.srcs.map((src, index) => (
                        <div key={index} className="relative w-full rounded overflow-clip shadow-md">
                            {" "}
                            <Image src={src} alt={props.alts?.[index] ?? ""} width={700} height={700} className="w-full h-auto" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 700px" />
                        </div>
                    ))}
                </div>
            )}
            {props.subtitle && <p className="opacity-90 text-sm w-full text-center mt-2">{props.subtitle}</p>}
        </>
    );
}
