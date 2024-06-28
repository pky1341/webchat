import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-muted text-muted-foreground py-12 md:py-16">
            <div className="container max-w-7xl px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="flex flex-col gap-4">
                        <Link href="#" className="flex items-center gap-2" prefetch={false}>
                            <MountainIcon className="h-6 w-6" />
                            <span className="font-bold text-lg">Acme Store</span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Discover the best products for your home and lifestyle at Acme
                            Store. We offer a wide selection of high-quality items at
                            affordable prices.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="grid gap-2">
                            <h4 className="font-medium">Quick Links</h4>
                            <Link
                                href="#"
                                className="text-sm hover:underline"
                                prefetch={false}
                            >
                                Home
                            </Link>
                            <Link
                                href="#"
                                className="text-sm hover:underline"
                                prefetch={false}
                            >
                                Shop
                            </Link>
                            <Link
                                href="#"
                                className="text-sm hover:underline"
                                prefetch={false}
                            >
                                About
                            </Link>
                            <Link
                                href="#"
                                className="text-sm hover:underline"
                                prefetch={false}
                            >
                                Contact
                            </Link>
                        </div>
                        <div className="grid gap-2">
                            <h4 className="font-medium">Follow Us</h4>
                            <div className="flex gap-2">
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    <TwitterIcon className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    <FacebookIcon className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    <InstagramIcon className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 md:justify-end">
                        <p className="text-sm">
                            &copy; 2024 Acme Store. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FacebookIcon(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function InstagramIcon(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function MountainIcon(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}

function TwitterIcon(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    );
}
