import React from "react";
import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";

const schools = [
	{
		uni: "Saint Cloud State University",
		degree: "Bachelor’s in Information Systems",
		emoji: "🎓",
		year: "2021"
	},
	{
		uni: "Trine University",
		degree: "Master’s in Business Analytics",
		emoji: "📊",
		year: "2026"
	},
];

export default function EducationSection() {
	return (
		<div className="relative py-20 sm:py-28 bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#6dd5ed] dark:from-[#232946] dark:via-[#1e3c72] dark:to-[#0f2027] transition-colors duration-300 overflow-hidden">
			{/* Decorative blurred blobs */}
			<div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute top-1/2 right-0 w-56 sm:w-80 h-56 sm:h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
			<div className="absolute bottom-0 left-1/3 w-48 sm:w-72 h-48 sm:h-72 bg-violet-400/20 rounded-full blur-2xl pointer-events-none" />

			<div className="max-w-2xl mx-auto mb-10 sm:mb-16 relative z-10 px-4">
				<motion.h2
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="text-center text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold font-poppins tracking-tight text-white drop-shadow-[0_4px_32px_rgba(59,130,246,0.25)] relative"
				>
					<span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
						Education
					</span>
					<span className="block mx-auto mt-3 sm:mt-4 h-1 w-20 sm:w-28 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 rounded-full animate-pulse" />
				</motion.h2>
			</div>
			<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 px-4 sm:px-6 relative z-10">
				{schools.map((s, i) => (
					<motion.div
						key={s.uni}
						initial={{ opacity: 0, y: 40, scale: 0.97 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ delay: i * 0.2, duration: 0.6 }}
						className="relative rounded-2xl sm:rounded-3xl glass-card border border-blue-400/20 dark:border-blue-400/10 p-6 sm:p-10 shadow-2xl hover:shadow-blue-400/40 transition-all hover:-translate-y-2 hover:scale-[1.04] backdrop-blur-2xl shine group"
					>
						{/* top accent line */}
						<span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 opacity-70" />
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
							<FaUniversity className="text-xl sm:text-2xl text-blue-400 dark:text-cyan-300 drop-shadow" />
							<h3 className="text-lg sm:text-xl font-bold font-[Poppins] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
								{s.uni}
							</h3>
							<span className="sm:ml-auto text-xl sm:text-2xl">{s.emoji}</span>
						</div>

						<p className="text-sm sm:text-base text-gray-700 dark:text-white/80">{s.degree}</p>

						<div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3 items-center flex-wrap">
							<span className="inline-block px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-white text-xs sm:text-xs font-semibold tracking-wide shadow-md">
								{s.degree.startsWith("Bachelor") ? "Undergrad" : "Graduate"}
							</span>
							<button
								type="button"
								className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition"
								tabIndex={-1}
								aria-label={`Year ${s.year}`}
							>
								{s.year}
							</button>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}

