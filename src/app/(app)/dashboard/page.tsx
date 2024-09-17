import { DashBoard } from "@/components/main/DashBoard";
import { Suspense } from 'react';

export default function ChatPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashBoard />
        </Suspense>
    );
}
