import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className="font-sans antialiased">
            <span className="text-green-500 font-black">e</span>
            <span className="dark:text-white font-bold">Stacja</span>
        </div>
    );
}
