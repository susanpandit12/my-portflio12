import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

const socials = [
	{
		label: "LinkedIn",
		icon: FaLinkedinIn,
		url: "https://www.linkedin.com/in/susan-pandit/",
		color: "#0077B5",
	},
	{
		label: "X",
		icon: FaTwitter,
		url: "https://x.com/champsusan23",
		color: "#000000",
	},
	{
		label: "Instagram",
		icon: FaInstagram,
		url: "https://www.instagram.com/_susan_23_/",
		color: "#E1306C",
	},
	{
		label: "Facebook",
		icon: FaFacebookF,
		url: "https://www.facebook.com/champsusan/",
		color: "#4267B2",
	},
];

export default function SocialLinksSection() {
	return (
		<section
			id="social"
			className="relative py-32 px-4 sm:px-6 bg-gradient-to-br from-[#e0eafc] via-[#cfdef3] to-[#a1c4fd] dark:from-[#232946] dark:via-[#1e3c72] dark:to-[#0f2027] transition-colors duration-300 overflow-hidden text-gray-900 dark:text-white"
		>
			{/* Decorative blurred blobs */}
			<div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute top-1/2 right-0 w-56 sm:w-80 h-56 sm:h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
			<div className="absolute bottom-0 left-1/3 w-48 sm:w-72 h-48 sm:h-72 bg-violet-400/20 rounded-full blur-2xl pointer-events-none" />

			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="text-center text-6xl sm:text-7xl font-extrabold mb-20 font-poppins bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 dark:from-cyan-300 dark:via-blue-400 dark:to-violet-400 drop-shadow-lg tracking-tight relative z-10"
			>
				Connect With Me
				<span className="block mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 rounded-full animate-pulse" />
			</motion.h2>

			<div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 justify-items-center relative z-10">
				{socials.map((s, idx) => {
					const Icon = s.icon;
					return (
						<motion.a
							key={s.label}
							href={s.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={s.label}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: idx * 0.15 }}
							className="relative w-28 sm:w-32 h-28 sm:h-32 flex flex-col items-center justify-center rounded-3xl border border-blue-400/20 dark:border-blue-400/10 bg-white/60 dark:bg-white/10 backdrop-blur-xl shadow-2xl group overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-blue-400/40 shine float-soft"
						>
							<div
								className="absolute inset-0 z-0 transition-opacity duration-300 group-hover:opacity-60 rounded-3xl"
								style={{
									background: `linear-gradient(135deg, ${s.color}33 0%, transparent 100%)`,
									boxShadow: `0 0 40px ${s.color}66`,
								}}
							/>
							<Icon className="text-4xl z-10 text-gray-800 dark:text-white transition-transform group-hover:scale-110" />
							<span className="mt-3 z-10 text-base font-semibold font-poppins group-hover:text-white transition">
								{s.label}
							</span>
						</motion.a>
					);
				})}
			</div>
		</section>
	);
}
