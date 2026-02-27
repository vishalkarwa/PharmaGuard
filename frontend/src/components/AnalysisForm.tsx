"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud, FileCode2, X, AlertTriangle, DatabaseZap, Pill } from "lucide-react";

interface AnalysisFormProps {
    onSubmit: (file: File, drugs: string[]) => void;
}

const TARGET_DRUGS = [
    "CODEINE",
    "WARFARIN",
    "CLOPIDOGREL",
    "SIMVASTATIN",
    "AZATHIOPRINE",
    "FLUOROURACIL"
];

export default function AnalysisForm({ onSubmit }: AnalysisFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [selectedDrugs, setSelectedDrugs] = useState<Set<string>>(new Set(["CODEINE", "CLOPIDOGREL"]));
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (selectedFile: File) => {
        setError(null);
        if (!selectedFile.name.toLowerCase().endsWith('.vcf')) {
            setError("Invalid format: Only .vcf files are accepted.");
            return false;
        }
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError("File too large: Maximum size is 5MB.");
            return false;
        }
        return true;
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
            }
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
            }
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const clearFile = () => {
        setFile(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const toggleDrug = (drug: string) => {
        setSelectedDrugs(prev => {
            const next = new Set(prev);
            if (next.has(drug)) next.delete(drug);
            else next.add(drug);
            return next;
        });
    };

    const handleSubmit = () => {
        if (!file) {
            setError("Please upload a VCF file.");
            return;
        }
        if (selectedDrugs.size === 0) {
            setError("Please select at least one target therapeutic compound.");
            return;
        }

        // Convert Set to array for API payload
        const drugsPayload = Array.from(selectedDrugs);
        onSubmit(file, drugsPayload);
    };

    return (
        <div className="w-full max-w-xl mx-auto p-8 rounded-3xl bg-white backdrop-blur-xl border border-black/5 shadow-xl relative overflow-hidden flex flex-col items-center mt-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight text-center">VCF Analysis</h3>
            <p className="text-slate-600 mb-8 max-w-sm text-center text-sm">
                Upload your patient's Variant Call Format (.vcf) file and specify target pharmacotherapies for AI review.
            </p>

            {/* Error Banner */}
            {error && (
                <div className="w-full mb-6 p-4 rounded-xl bg-danger/5 border border-danger/20 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                    <p className="text-sm text-danger">{error}</p>
                </div>
            )}

            {/* Drag & Drop File Upload */}
            {!file ? (
                <div
                    className={`w-full mb-6 p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer group
                        ${isDragging ? 'border-primary bg-primary/5' : 'border-black/10 hover:border-primary/30 hover:bg-slate-50'}
                    `}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept=".vcf"
                        className="hidden"
                    />

                    <div className="text-center flex flex-col items-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mb-4 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-slate-900 font-medium mb-1">Click to upload or drag & drop</p>
                        <p className="text-xs text-slate-500 font-mono">.vcf files only (Max 5MB)</p>
                    </div>
                </div>
            ) : (
                <div className="w-full mb-6 flex items-center justify-between bg-safe/5 p-4 rounded-xl border border-safe/20">
                    <div className="flex items-center gap-4 truncate pr-4">
                        <div className="p-2 bg-safe/10 rounded-lg shrink-0">
                            <FileCode2 className="w-6 h-6 text-safe" />
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-sm font-semibold text-slate-900 truncate">{file.name}</span>
                            <span className="text-xs text-safe font-mono">{(file.size / 1024).toFixed(1)} KB (Validated)</span>
                        </div>
                    </div>
                    <button
                        onClick={clearFile}
                        className="p-2 hover:bg-safe/10 rounded-lg text-safe hover:text-slate-900 transition-colors border border-transparent hover:border-safe/20"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Target Drugs Toggle Grid */}
            <div className="w-full mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <Pill className="h-4 w-4 text-primary" />
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">Target Therapeutics</label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TARGET_DRUGS.map(drug => {
                        const isSelected = selectedDrugs.has(drug);
                        return (
                            <button
                                key={drug}
                                onClick={() => toggleDrug(drug)}
                                className={`py-2.5 px-3 rounded-lg border text-xs font-bold font-mono transition-all duration-200 
                                    ${isSelected
                                        ? 'bg-primary/10 border-primary/50 text-primary shadow-sm'
                                        : 'bg-slate-50 border-black/5 text-slate-500 hover:border-black/10 hover:text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                {drug}
                            </button>
                        );
                    })}
                </div>
                <p className="text-[10px] text-slate-500 mt-3">Select the active compounds to sequence against the patient variant file.</p>
            </div>

            {/* Submit CTA */}
            <button
                onClick={handleSubmit}
                className="btn-biotech w-full flex items-center gap-3 justify-center py-4 text-base group relative shadow-md hover:shadow-lg"
            >
                <DatabaseZap className="w-5 h-5" />
                Start AI Analysis
            </button>
        </div>
    );
}
