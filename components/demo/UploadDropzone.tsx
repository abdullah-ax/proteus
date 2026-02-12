"use client";

export function UploadDropzone() {
  return (
    <div className="rounded-2xl border border-dashed border-white/30 bg-white/5 p-6 text-center">
      <p className="text-sm text-white/80">Drag & drop or upload your photo.</p>
      <button
        type="button"
        className="mt-3 rounded-xl bg-white/15 px-4 py-2 text-xs font-semibold text-white"
      >
        Upload
      </button>
    </div>
  );
}
