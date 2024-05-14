"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
    const [text, setText] = useState<string>("")
    const [audio, setAudio] = useState<string | null>(null)

    const toSpeech = async () => {
        const response = await fetch('/api/speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        const arrayBuffer = await response.arrayBuffer();

        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);

        setAudio(url);
    }

    return <div>
        <Input type="text" value={text} onChange={e => setText(e.target.value)} />
        {audio && <audio src={audio} controls></audio>}
        <Button onClick={toSpeech}>Convert to Speech</Button>
    </div>
}
