import { useState } from "react";
import * as Tone from "tone";

export default function MusicGenerator() {
  const [isPlay, setIsPlay] = useState(false);

  const notes1 = 
  ["C1", "C3", "C1", "C4", "C3", "C2",  "C3", "C4",
      "C3", "C1", "C2", "C4", "C3", "C2", 
          "Ab2", "Ab1", "Ab2", "Ab3",  "G#2", "G#1", "G#2",  "G#3", "A2", "A1", "A2",
              "A3", "A2", "A1", "A2", "A3", "G#3", "G#2", "G#1", "C#1"]

  const notes2 = [ "D4", "F3", "D4", "F3", "D3", "F3", "D3", "F3",
                         "D4", "F3", "D4", "F3", "D3", "F3", "D3", "F3", "F2", "F1",
                               "F2", "F3", "F2", "F1", "F2", "F3", "E2", "E1", "E2",
                                    "E3", "D#2", "D#1", "D#2", "D#3", "C#2", "C#1", "C#2", "C#3", "C2", "C1", "C2", "C3", "C2", "C1"];
    
  const playSequence = async () => {
    setIsPlay(true);
    await Tone.start();
    const now = Tone.now();

    const synth1 = new Tone.MonoSynth().toDestination();

      const synth2 = new Tone.FMSynth({
        volume: 2,
        modulationIndex: 10,
        harmonicity: 3,
        envelope: { attack: 0.03, decay: 0.2, sustain: 0.8, release: 0.8 },
      }).toDestination();

      notes1.forEach((note, index) => {
        synth1.triggerAttackRelease(note, "16n", now + index * 0.22);
      });

    notes2.forEach((note, index) => {
      synth2.triggerAttackRelease(note, "16n", now + index * 0.22);
    });

    const totalTime = Math.max(notes2.length, notes2.length) * 0.25 + 0.3;

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
