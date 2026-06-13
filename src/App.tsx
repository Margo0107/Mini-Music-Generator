import { useState } from "react";
import * as Tone from "tone";

export default function MusicGenerator() {
  const [isPlay, setIsPlay] = useState(false);
      const now = Tone.now();

  const notes = ["C1", "C3", "C1", "C4", "C3", "C2",  "C3", "C4",
      "Ab2", "Ab1", "Ab2", "Ab3",  "G#2", "G#1", "G#2",  "G#3", "A2", "A1", "A2",
        "A3", "A2", "A1", "A2", "A3", "G#3", "G#2", "G#1", "C#1"] 
    
  const playSequence = async () => {
    setIsPlay(true);
    await Tone.start();
    const now = Tone.now();

    const synth = new Tone.MonoSynth().toDestination();

    notes.forEach((note, index) => {
      synth.triggerAttackRelease(note, "16n", now + index * 0.25);
    });

    const totalTime = notes.length * 0.25 + 0.3;

    setTimeout(() => {
      setIsPlay(false);
    }, totalTime * 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl bg-slate-800/95 border border-slate-700 p-8 shadow-2xl shadow-slate-950/40 text-white">
        <h1 className="text-3xl font-semibold mb-3">Mini Music Generator</h1>
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={playSequence}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Play
          </button>
          <div
            className={`bg-blue-500 h-7 w-7 rounded-full transition-transform duration-500 ${isPlay ? "scale-150 animate-bounce" : "scale-100"}`}
          ></div>
        </div>
      </section>
    </div>
  );
}
