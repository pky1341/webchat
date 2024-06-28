import { Button } from "@/components/ui/button";
import chat from "@/images/chat1.png";
import chat2 from "@/images/chat2.png";
import light from "@/images/icon/lightining.png";
import shield from "@/images/icon/shield.png";
import smart from "@/images/icon/skill.png";
import Image from "next/image";

export default function Intro() {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-muted  text-foreground">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Next-Gen Real-Time Chat
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-500">
                        Powered by AI
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Experience seamless communication with our cutting-edge chat
                        application. Connect, collaborate, and chat in real-time like never
                        before.
                    </p>
                    <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/80 px-6 py-3 rounded-lg">
                        Get Started
                    </Button>
                </div>
                <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
                    <Image
                        src={chat}
                        alt="Chat application illustration"
                        className="rounded-lg"
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-muted text-foreground">
                <div className="md:w-1/2 text-center md:text-left md:order-2 mx-5">
                    <h1 className="text-3xl md:text-4xl font-bold">Revolutionize Your</h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-500">
                        Team Communication
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Experience seamless communication with our cutting-edge chat
                        application. Connect, collaborate, and chat in real-time like never
                        before. Enjoy seamless conversations with instant message delivery.
                        Experience real-time conversations powered by AI Instant message
                        delivery for smooth, uninterrupted conversations across all devices.
                    </p>
                    <blockquote className="mt-6 text-xl md:text-2xl italic">
                        &quot;In a world full of messages, be the chat that matters.&quot;
                    </blockquote>
                </div>
                <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center md:order-1">
                    <Image
                        src={chat2}
                        alt="Chat application illustration"
                        className="rounded-lg"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center space-y-8 bg-muted">
                <h2 className="text-3xl font-bold text-foreground">Cutting-Edge Features</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mx-6 my-4">
                    <div className="bg-card p-6 rounded-lg shadow-lg">
                        <Image alt="lightning-bolt" src={light} className="mb-4 h-6 w-6" />
                        <h3 className="text-xl font-semibold text-card-foreground">Real-Time Messaging</h3>
                        <p className="text-muted-foreground">Instant message delivery for smooth, uninterrupted conversations across all devices.</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow-lg">
                        <Image alt="shield" src={shield} className="mb-4 h-6 w-6" />
                        <h3 className="text-xl font-semibold text-card-foreground">AI-Powered Security</h3>
                        <p className="text-muted-foreground">Advanced encryption and AI-driven threat detection to keep your conversations private and secure.</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow-lg">
                        <Image alt="smart-suggestions" src={smart} className="mb-4 h-6 w-6" />
                        <h3 className="text-xl font-semibold text-card-foreground">Smart Suggestions</h3>
                        <p className="text-muted-foreground">AI-driven response suggestions and content recommendations to enhance productivity.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
