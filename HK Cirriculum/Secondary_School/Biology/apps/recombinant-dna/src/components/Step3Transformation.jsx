import { useState } from "react";

const CHOICES = [
  {
    id: "marker",
    label: "標誌基因用來辨認哪些細胞取得了載體",
    ok: true,
    why: "正確。標誌基因是辨認概念。本課不提供轉化、熱激或培養步驟。"
  },
  {
    id: "heat",
    label: "要記下溫度並把細胞塗到培養基上，原理才算完成",
    ok: false,
    why: "不對。重組 DNA 的原理到限制酶、連接酶和載體為止。培養和熱激不是這課的內容。"
  },
  {
    id: "any",
    label: "任何細胞都會表現目標基因，不需要辨認",
    ok: false,
    why: "不對。只有取得重組載體的細胞才帶有目標基因。標誌基因用來把它們辨認出來。"
  }
];

export default function Step3Transformation({ onComplete }) {
  const [picked, setPicked] = useState(null);
  const choice = CHOICES.find((item) => item.id === picked);

  return (
    <div className="flex flex-col items-center space-y-6 p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-800">概念：怎樣知道細胞取得載體</h2>
      <p className="text-slate-600 text-center">
        載體可以帶着目標基因。標誌基因的作用是辨認，不是一份操作手冊。
        這裡沒有溫度、培養基或塗板步驟。
      </p>
      <div className="grid gap-3 w-full">
        {CHOICES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPicked(item.id)}
            className="text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-indigo-400"
          >
            {item.label}
          </button>
        ))}
      </div>
      {choice && (
        <div className={`w-full rounded-xl p-4 ${choice.ok ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"}`}>
          <p>{choice.why}</p>
          {choice.ok && (
            <button
              type="button"
              onClick={onComplete}
              className="mt-3 px-4 py-2 rounded-full bg-indigo-600 text-white font-bold"
            >
              完成概念
            </button>
          )}
        </div>
      )}
    </div>
  );
}
