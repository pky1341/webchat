import * as React from "react";

const Loader2Icon = React.forwardRef<
    SVGSVGElement,
    React.SVGAttributes<SVGSVGElement>
>(({ ...props }, ref) => (
    <svg
        ref={ref}
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6-2a2 2 0 100-4m0 2a2 2 0 110-4m0 6a2 2 0 100 4m0-4a2 2 0 110 4m6-2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 2a2 2 0 110-4m0 6a2 2 0 100 4m0-4a2 2 0 110 4m6-2a2 2 0 100 4m0-4a2 2 0 110 4"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
));

Loader2Icon.displayName = "Loader2Icon";

export { Loader2Icon };