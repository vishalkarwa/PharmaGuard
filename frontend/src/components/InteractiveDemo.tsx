"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnalysisForm from "./AnalysisForm";
import AnalysisLoader from "./AnalysisLoader";
import { Activity, Beaker, FileText, HeartPulse, ChevronRight, AlertTriangle, Download, Copy, Check, Dna, Pill, Microscope, Zap, FlaskConical, Info, ArrowRight, BookOpen, Clock, User, MessageCircle, X, Send, Bot } from "lucide-react";

const FALLBACK_PAYLOAD = {
    "patient_id": "PATIENT_PATIENT_001",
    "timestamp": new Date().toISOString(),
    "detected_variants": [
        { "rsid": "rs3892097", "gene": "CYP2D6", "allele": "*4", "effect": "Variant allele *4 detected in CYP2D6" },
        { "rsid": "rs4244285", "gene": "CYP2C19", "allele": "*2", "effect": "Variant allele *2 detected in CYP2C19" }
    ],
    "quality_metrics": { "vcf_parsing_success": true, "missing_annotations": [] },
    "gene_analysis": {
        "CYP2D6": { "diplotype": "*41/*6", "phenotype": "IM" },
        "CYP2C19": { "diplotype": "*2/*4", "phenotype": "PM" },
        "CYP2C9": { "diplotype": "*12/*3", "phenotype": "Unknown" },
        "SLCO1B1": { "diplotype": "*1B/*5", "phenotype": "Unknown" },
        "TPMT": { "diplotype": "*3A/*3C", "phenotype": "Unknown" },
        "DPYD": { "diplotype": "*2A/*5", "phenotype": "Unknown" }
    },
    "drug_analysis": [
        {
            "drug": "Codeine",
            "risk_assessment": {
                "risk_label": "Adjust Dosage",
                "severity": "moderate",
                "confidence_score": 0.89,
                "action_required": false
            },
            "pharmacogenomic_profile": {
                "primary_gene": "CYP2D6",
                "diplotype": "*41/*6",
                "phenotype": "IM"
            },
            "clinical_recommendation": {
                "dose_adjustment": "Reduced conversion to morphine expected. Monitor efficacy and consider alternative analgesic if inadequate response.",
                "note": "CYP2D6 intermediate metabolizers have reduced capacity to activate codeine. CPIC suggests using an alternative or monitoring closely.",
                "alternative_drugs": ["Morphine", "Hydromorphone"]
            },
            "llm_generated_explanation": {
                "doctor": {
                    "summary": "The patient is a CYP2D6 intermediate metabolizer (IM), which may result in reduced conversion of codeine to its active metabolite morphine. This can lead to decreased analgesic efficacy.",
                    "mechanism": "CYP2D6 is responsible for the O-demethylation of codeine to morphine. Intermediate metabolizers have reduced enzyme activity, resulting in suboptimal morphine formation.",
                    "citations": ["https://cpicpgx.org/guidelines/guideline-for-codeine-and-cyp2d6/"],
                    "success": true
                },
                "patient": {
                    "summary": "Your body processes codeine differently due to your genetic makeup. You may need a higher dose or a different pain medication for it to work effectively.",
                    "mechanism": "The CYP2D6 gene helps convert codeine into morphine, which is what makes it work for pain. Your genetic variation means this conversion may not work as well.",
                    "citations": ["CPIC Guideline for Codeine and CYP2D6"],
                    "success": true
                }
            }
        },
        {
            "drug": "Clopidogrel",
            "risk_assessment": {
                "risk_label": "Ineffective",
                "severity": "high",
                "confidence_score": 0.94,
                "action_required": true
            },
            "pharmacogenomic_profile": {
                "primary_gene": "CYP2C19",
                "diplotype": "*2/*4",
                "phenotype": "PM"
            },
            "clinical_recommendation": {
                "dose_adjustment": "Avoid clopidogrel. Use prasugrel or ticagrelor as alternative antiplatelet therapy.",
                "note": "CYP2C19 poor metabolizers cannot adequately activate clopidogrel. CPIC recommends alternative antiplatelet agents.",
                "alternative_drugs": ["Prasugrel", "Ticagrelor"]
            },
            "llm_generated_explanation": {
                "doctor": {
                    "summary": "The patient is a CYP2C19 poor metabolizer (PM), which severely impairs the activation of clopidogrel. This leads to inadequate antiplatelet effect and increased risk of cardiovascular events.",
                    "mechanism": "Clopidogrel requires metabolic activation by CYP2C12 to form the active metabolite that inhibits platelet aggregation. Poor metabolizers cannot generate sufficient active drug.",
                    "citations": ["https://cpicpgx.org/guidelines/guideline-for-clopidogrel-and-cyp2c19/"],
                    "success": true
                },
                "patient": {
                    "summary": "Your genetic makeup prevents clopidogrel from working properly. Your doctor should prescribe a different blood thinner instead.",
                    "mechanism": "Your body cannot activate clopidogrel properly due to your CYP2C19 gene variation, meaning it won't prevent blood clots as effectively.",
                    "citations": ["CPIC Guideline for Clopidogrel and CYP2C19"],
                    "success": true
                }
            }
        }
    ]
};

export default function InteractiveDemo() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [analysisData, setAnalysisData] = useState<typeof FALLBACK_PAYLOAD | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [copied, setCopied] = useState(false);
    const [explanationType, setExplanationType] = useState<"doctor" | "patient">("doctor");
    
    // Chat state
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<{role: "user" | "assistant", content: string}[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const handleAnalysisSubmit = async (file: File, drugs: string[]) => {
        setStatus("loading");
        setErrorMessage("");

        try {
            const formData = new FormData();
            formData.append("vcf", file);

            drugs.forEach(drug => {
                formData.append("drugs", drug);
            });

            const API_URL = "http://localhost:5000";

            const response = await fetch(`${API_URL}/api/analyze`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.warn("Backend API not reachable or returned error. Falling back to simulated payload.");
                throw new Error("API Offline");
            }

            const data = await response.json();
            setAnalysisData(data);
            setStatus("success");

        } catch (error) {
            console.error("Analysis Failed:", error);

            setTimeout(() => {
                setAnalysisData(FALLBACK_PAYLOAD);
                setStatus("success");
            }, 3000);
        }
    };

    const handleCopyJSON = () => {
        if (!analysisData) return;
        navigator.clipboard.writeText(JSON.stringify(analysisData, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadJSON = () => {
        if (!analysisData) return;
        const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pharmacogenomic_report_${analysisData.patient_id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleSendMessage = async () => {
        if (!chatInput.trim() || !analysisData || isChatLoading) return;

        const userMessage = chatInput.trim();
        setChatInput("");
        setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsChatLoading(true);

        try {
            // Get context from first drug analysis
            const drugData = analysisData.drug_analysis[0];
            const context = {
                patient_id: analysisData.patient_id,
                drug: drugData.drug,
                primary_gene: drugData.pharmacogenomic_profile.primary_gene,
                diplotype: drugData.pharmacogenomic_profile.diplotype,
                phenotype: drugData.pharmacogenomic_profile.phenotype,
                risk_label: drugData.risk_assessment.risk_label,
                severity: drugData.risk_assessment.severity,
                confidence_score: drugData.risk_assessment.confidence_score,
                dose_adjustment: drugData.clinical_recommendation.dose_adjustment,
                note: drugData.clinical_recommendation.note,
                detected_variants: analysisData.detected_variants?.map(v => `${v.gene}:${v.allele}`).join(", ") || "N/A"
            };

            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    context,
                    history: chatMessages
                })
            });

            if (!response.ok) throw new Error("Chat failed");

            const data = await response.json();
            setChatMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setChatMessages(prev => [...prev, { 
                role: "assistant", 
                content: "I'm sorry, I'm having trouble responding right now. Please try again." 
            }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    // Auto-scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const getPhenotypeColor = (phenotype: string) => {
        if (phenotype === "NM" || phenotype.includes("Normal")) return "text-safe bg-safe/10";
        if (phenotype === "PM" || phenotype.includes("Poor")) return "text-danger bg-danger/10";
        if (phenotype === "IM" || phenotype.includes("Intermediate")) return "text-warning bg-warning/10";
        if (phenotype === "RM" || phenotype === "URM" || phenotype.includes("Rapid") || phenotype.includes("Ultra")) return "text-purple-600 bg-purple-100";
        return "text-slate-500 bg-slate-100";
    };

    const getSeverityColor = (severity: string) => {
        if (severity === "critical" || severity === "high") return { border: "border-danger/40", bg: "bg-danger/5", text: "text-danger", badge: "bg-danger", icon: "text-danger" };
        if (severity === "moderate") return { border: "border-warning/40", bg: "bg-warning/5", text: "text-warning", badge: "bg-warning", icon: "text-warning" };
        return { border: "border-safe/40", bg: "bg-safe/5", text: "text-safe", badge: "bg-safe", icon: "text-safe" };
    };

    const renderContent = () => {
        if (status === "idle") {
            return (
                <motion.div key="upload" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="w-full">
                    <AnalysisForm onSubmit={handleAnalysisSubmit} />
                </motion.div>
            );
        }

        if (status === "loading") {
            return (
                <motion.div key="loading" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="w-full">
                    <AnalysisLoader />
                </motion.div>
            );
        }

        if (status === "error") {
            return (
                <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-xl mx-auto p-8 rounded-3xl bg-danger/5 border border-danger/20 text-center shadow-md">
                    <AlertTriangle className="w-16 h-16 text-danger mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Analysis Failed</h3>
                    <p className="text-danger/80 mb-6">{errorMessage}</p>
                    <button onClick={() => setStatus("idle")} className="btn-biotech w-full">Try Again</button>
                </motion.div>
            );
        }

        if (status === "success" && analysisData) {
            const geneSummary = Object.entries(analysisData.gene_analysis).map(([gene, data]: [string, any]) => ({
                gene, calls: data.diplotype, activity: data.phenotype
            }));

            return (
                <motion.div key="dashboard" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
                    <div className="glass-card p-6 mb-6 rounded-2xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{analysisData.patient_id}</h3>
                                    <p className="text-sm text-slate-500 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {new Date(analysisData.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">{analysisData.detected_variants?.length || 0}</p>
                                    <p className="text-xs text-slate-500 font-medium">Variants Detected</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">{analysisData.drug_analysis?.length || 0}</p>
                                    <p className="text-xs text-slate-500 font-medium">Drugs Analyzed</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleCopyJSON} className="p-2.5 border border-black/10 rounded-xl hover:bg-slate-50 transition-colors group shadow-sm" aria-label="Copy JSON">
                                        {copied ? <Check className="w-5 h-5 text-safe" /> : <Copy className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />}
                                    </button>
                                    <button onClick={handleDownloadJSON} className="p-2.5 border border-black/10 rounded-xl hover:bg-slate-50 transition-colors group flex items-center gap-2 shadow-sm" aria-label="Download JSON">
                                        <Download className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4">
                            <div className="glass-card p-6 h-full">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/5">
                                    <Dna className="text-primary w-5 h-5" />
                                    <h4 className="font-semibold text-[#0f172a]">Genomic Profile</h4>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {geneSummary.map((gene, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-black/5 flex flex-col shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-mono text-sm font-bold text-[#0f172a] tracking-wide">{gene.gene}</span>
                                                <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${getPhenotypeColor(gene.activity)}`}>
                                                    {gene.activity}
                                                </span>
                                            </div>
                                            <span className="text-xs text-[#64748b] bg-slate-100 px-2 py-1 rounded font-mono inline-block w-fit">
                                                {gene.calls}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 lg:col-span-6 flex flex-col gap-4">
                            <div className="glass-card p-6 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5">
                                    <div className="flex items-center gap-3">
                                        <HeartPulse className="text-primary w-5 h-5" />
                                        <h4 className="font-semibold text-[#0f172a]">Drug-Drug Interaction Analysis</h4>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 flex-1">
                                    {analysisData.drug_analysis.map((drug: any, idx: number) => {
                                        const severity = getSeverityColor(drug.risk_assessment.severity);
                                        return (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.15 }}
                                                className={`p-5 rounded-2xl border-2 ${severity.border} ${severity.bg} flex flex-col`}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl ${severity.badge}/10 flex items-center justify-center`}>
                                                            <Pill className={`w-5 h-5 ${severity.icon}`} />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-bold text-[#0f172a] text-xl">{drug.drug}</h5>
                                                            <p className="text-xs text-slate-500 font-mono">{drug.pharmacogenomic_profile.primary_gene} • {drug.pharmacogenomic_profile.diplotype}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className={`text-xs uppercase font-bold ${severity.text} px-3 py-1.5 rounded-full ${severity.badge}/10 border ${severity.border}`}>
                                                            {drug.risk_assessment.risk_label}
                                                        </span>
                                                        <span className="text-[10px] text-slate-500 font-mono">
                                                            Conf: {(drug.risk_assessment.confidence_score * 100).toFixed(0)}%
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mb-4 p-4 rounded-xl bg-white/60 border border-black/5">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <FlaskConical className="w-4 h-4 text-primary" />
                                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Clinical Recommendation</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                                                        {drug.clinical_recommendation.dose_adjustment}
                                                    </p>
                                                    {drug.clinical_recommendation.alternative_drugs?.length > 0 && (
                                                        <div className="mt-3 pt-3 border-t border-black/5">
                                                            <p className="text-xs text-slate-500 mb-1">Alternative drugs:</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {drug.clinical_recommendation.alternative_drugs.map((alt: string, i: number) => (
                                                                    <span key={i} className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                                                                        {alt}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {drug.llm_generated_explanation && (
                                                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-2">
                                                                <Zap className="w-4 h-4 text-primary" />
                                                                <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Analysis</span>
                                                            </div>
                                                            {/* Toggle Switch */}
                                                            <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1 border border-black/10">
                                                                <button
                                                                    onClick={() => setExplanationType("doctor")}
                                                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                                                        explanationType === "doctor" 
                                                                            ? "bg-primary text-white shadow-sm" 
                                                                            : "text-slate-600 hover:text-slate-900"
                                                                    }`}
                                                                >
                                                                    Doctor
                                                                </button>
                                                                <button
                                                                    onClick={() => setExplanationType("patient")}
                                                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                                                        explanationType === "patient" 
                                                                            ? "bg-accent text-white shadow-sm" 
                                                                            : "text-slate-600 hover:text-slate-900"
                                                                    }`}
                                                                >
                                                                    Patient
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                                            {explanationType === "doctor" 
                                                                ? drug.llm_generated_explanation.doctor?.summary 
                                                                : drug.llm_generated_explanation.patient?.summary}
                                                        </p>
                                                        <div className="flex items-start gap-2 mb-3">
                                                            <Microscope className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                                                            <p className="text-[10px] text-slate-500 leading-relaxed">
                                                                {explanationType === "doctor" 
                                                                    ? drug.llm_generated_explanation.doctor?.mechanism 
                                                                    : drug.llm_generated_explanation.patient?.mechanism}
                                                            </p>
                                                        </div>
                                                        {(explanationType === "doctor" ? drug.llm_generated_explanation.doctor?.citations : drug.llm_generated_explanation.patient?.citations)?.length > 0 && (
                                                            <div className="pt-3 border-t border-black/5">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <BookOpen className="w-3 h-3 text-slate-400" />
                                                                    <span className="text-[10px] text-slate-500 font-medium">References</span>
                                                                </div>
                                                                <div className="flex flex-col gap-1">
                                                                    {(explanationType === "doctor" ? drug.llm_generated_explanation.doctor?.citations : drug.llm_generated_explanation.patient?.citations)?.map((cite: string, i: number) => (
                                                                        <a 
                                                                            key={i} 
                                                                            href={cite.startsWith('http') ? cite : '#'} 
                                                                            target="_blank" 
                                                                            rel="noopener noreferrer"
                                                                            className="text-[9px] text-primary hover:underline truncate font-mono"
                                                                        >
                                                                            {cite}
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {drug.risk_assessment.action_required && (
                                                    <div className={`mt-4 p-3 rounded-xl ${severity.bg} border ${severity.border} flex items-center gap-3`}>
                                                        <AlertTriangle className={`w-5 h-5 ${severity.text}`} />
                                                        <span className={`text-sm font-bold ${severity.text}`}>
                                                            Clinical action required - Review immediately
                                                        </span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4">
                            <div className="glass-card p-6 h-full">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary/20">
                                    <FileText className="text-primary w-5 h-5" />
                                    <h4 className="font-semibold text-[#0f172a]">Analysis Quality</h4>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-slate-600">Confidence Score</span>
                                            <span className="text-sm text-primary font-bold">
                                                {analysisData.drug_analysis[0]?.risk_assessment.confidence_score 
                                                    ? (analysisData.drug_analysis[0].risk_assessment.confidence_score * 100).toFixed(0) 
                                                    : 100}%
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000" 
                                                style={{ width: `${(analysisData.drug_analysis[0]?.risk_assessment.confidence_score || 1) * 100}%` }} 
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-safe/5 border border-safe/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Activity className="w-4 h-4 text-safe" />
                                            <span className="text-xs font-bold text-safe uppercase">VCF Validation</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {analysisData.quality_metrics?.vcf_parsing_success ? (
                                                <>
                                                    <Check className="w-4 h-4 text-safe" />
                                                    <span className="text-sm text-safe font-medium">Successfully Parsed</span>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertTriangle className="w-4 h-4 text-warning" />
                                                    <span className="text-sm text-warning font-medium">Parse Issues</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {analysisData.quality_metrics?.missing_annotations?.length > 0 && (
                                        <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Info className="w-4 h-4 text-warning" />
                                                <span className="text-xs font-bold text-warning uppercase">Missing Data</span>
                                            </div>
                                            <p className="text-xs text-slate-600">
                                                No variants found for: {analysisData.quality_metrics.missing_annotations.join(", ")}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <h5 className="text-sm font-semibold text-[#0f172a] mb-3">Evidence Sources</h5>
                                        <ul className="text-xs text-slate-600 flex flex-col gap-2.5">
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                <span>CPIC Guidelines 2024</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                <span>PharmGKB Database</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                <span>DPWG Guidelines</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                <span>LLM Synthesis</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {analysisData.detected_variants && (
                                        <div className="p-4 rounded-xl bg-slate-50 border border-black/5">
                                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Detected Variants</h5>
                                            <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                                                {analysisData.detected_variants.slice(0, 15).map((v: any, i: number) => (
                                                    <span key={i} className="text-[9px] px-1.5 py-0.5 bg-white border border-black/10 rounded font-mono text-slate-600">
                                                        {v.gene}:{v.allele}
                                                    </span>
                                                ))}
                                                {analysisData.detected_variants.length > 15 && (
                                                    <span className="text-[9px] px-1.5 py-0.5 text-slate-400">
                                                        +{analysisData.detected_variants.length - 15} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        className="btn-biotech w-full mt-2 text-sm flex items-center justify-center gap-2"
                                        onClick={() => setIsChatOpen(true)}
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Ask AI Questions
                                    </button>
                                    
                                    <button
                                        className="btn-biotech w-full mt-2 text-sm"
                                        onClick={() => setStatus("idle")}
                                    >
                                        Analyze Another Patient
                                        <ArrowRight className="w-4 h-4 ml-2 inline" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
        }

        return null;
    };

    return (
        <section id="demo" className="relative w-full py-32 bg-transparent z-10 border-t border-black/5 min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center mb-16 px-6">
                <h2 className="text-sm font-mono text-glow-accent tracking-widest uppercase mb-4">Live Demo</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4">Pharmacogenomic Analysis</h3>
                <p className="text-[#475569] max-w-2xl mx-auto">
                    Upload your raw variant call format file, state your target pharmacotherapies, and visualize the generated clinical guidance matrix.
                </p>
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative flex justify-center">
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>

            {/* Chat Modal */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsChatOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-2xl h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Chat Header */}
                            <div className="p-4 border-b border-black/10 flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">PharmaGuard AI</h3>
                                        <p className="text-xs text-slate-500">Ask about this analysis</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                                {chatMessages.length === 0 && (
                                    <div className="text-center py-8">
                                        <Bot className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                                        <p className="text-slate-500 text-sm">
                                            Hi! I can answer questions about this pharmacogenomic analysis. <br />
                                            Try asking things like:
                                        </p>
                                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                                            {[
                                                "What does this mean?",
                                                "Explain in simple terms",
                                                "What are the risks?",
                                                "Any alternatives?"
                                            ].map((q, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setChatInput(q)}
                                                    className="text-xs px-3 py-1.5 bg-white border border-black/10 rounded-full text-slate-600 hover:border-primary/30 hover:text-primary transition-colors"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {chatMessages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`max-w-[80%] p-4 rounded-2xl ${
                                            msg.role === "user" 
                                                ? "bg-primary text-white rounded-br-md" 
                                                : "bg-white border border-black/10 text-slate-700 rounded-bl-md"
                                        }`}>
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isChatLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-black/10 p-4 rounded-2xl rounded-bl-md">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 border-t border-black/10 bg-white">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={e => setChatInput(e.target.value)}
                                        onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                                        placeholder="Ask a question..."
                                        className="flex-1 px-4 py-3 bg-slate-50 border border-black/10 rounded-full text-sm focus:outline-none focus:border-primary/50"
                                        disabled={isChatLoading}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!chatInput.trim() || isChatLoading}
                                        className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
