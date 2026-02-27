"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

const sampleDrugs = [
    {
        name: "Codeine",
        gene: "CYP2D6 (*41/*6)",
        phenotype: "Intermediate Metabolizer",
        riskLevel: "Adjust Dose",
        mechanism: "CYP2D6 is responsible for the conversion of codeine to morphine. Reduced enzyme activity leads to decreased formation of morphine and potentially reduced analgesic effect.",
    },
    {
        name: "Warfarin",
        gene: "VKORC1 / CYP2C9",
        phenotype: "Intermediate",
        riskLevel: "Adjust Dose",
        mechanism: "Lower dose requirement due to decreased clearance. Frequent INR monitoring needed during induction.",
    },
    {
        name: "Clopidogrel",
        gene: "CYP2C19 (*2/*4)",
        phenotype: "Poor Metabolizer",
        riskLevel: "Ineffective",
        mechanism: "CYP2C19 poor metabolizer phenotype leads to impaired formation of the active metabolite, severely reducing the drug's antiplatelet effects. Use prasugrel.",
    },
    {
        name: "Simvastatin",
        gene: "SLCO1B1 (*5)",
        phenotype: "Poor Function",
        riskLevel: "Avoid",
        mechanism: "Decreased transporter function leads to increased systemic exposure of simvastatin, significantly raising the risk of statin-induced myopathy. Use an alternative statin.",
    },
    {
        name: "Azathioprine",
        gene: "TPMT / NUDT15",
        phenotype: "Poor Metabolizer",
        riskLevel: "Avoid",
        mechanism: "Significantly reduced TPMT/NUDT15 activity leads to fatal myelosuppression at standard doses. Consider alternative immunosuppressants.",
    },
    {
        name: "Fluorouracil",
        gene: "DPYD (*2A)",
        phenotype: "Normal Metabolizer",
        riskLevel: "Safe",
        mechanism: "Normal DPD enzyme activity. Standard dosing recommended per current clinical guidelines.",
    },
];

const getRiskStyle = (level: string) => {
    switch (level) {
        case "Safe":
            return {
                border: "border-green-500",
                bg: "bg-green-100",
                text: "text-green-700",
                icon: CheckCircle,
            };
        case "Adjust Dose":
            return {
                border: "border-orange-500",
                bg: "bg-orange-100",
                text: "text-orange-700",
                icon: AlertTriangle,
            };
        case "Avoid":
        case "Ineffective":
            return {
                border: "border-red-500",
                bg: "bg-red-100",
                text: "text-red-700",
                icon: AlertCircle,
            };
        default:
            return {
                border: "border-gray-300",
                bg: "bg-gray-100",
                text: "text-gray-700",
                icon: AlertCircle,
            };
    }
};

export default function DrugRiskPreview() {
    return (
        <section className="relative w-full py-32 bg-transparent z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                            Clear. Actionable. Clinical.
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sampleDrugs.map((drug, index) => {
                        const style = getRiskStyle(drug.riskLevel);

                        return (
                            <motion.div
                                key={drug.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`glass-card p-8 rounded-2xl border-l-[6px] ${style.border} flex flex-col h-full`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-2xl font-bold text-slate-900">{drug.name}</h4>
                                        <p className="text-sm font-mono text-slate-500 mt-1">{drug.gene} • {drug.phenotype}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${style.bg} ${style.text}`}>
                                        {drug.riskLevel}
                                    </div>
                                </div>

                                <p className="text-slate-600 leading-relaxed flex-grow text-sm mb-6">
                                    {drug.mechanism}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
