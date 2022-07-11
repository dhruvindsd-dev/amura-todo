import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./index.module.scss";

interface BottomControlsProps {
	setFilter: Dispatch<SetStateAction<filterTypes>>;
	filters: filterTypes;
}
// NATIVE IMPLEMENTATIONS WITHOUT LIBRARY
const BottomControls = ({ setFilter, filters }: BottomControlsProps) => {
	const [centers, setCenters] = useState<{
		all: number;
		completed: number;
		running: number;
	}>({ all: 0, completed: 0, running: 0 });

	useEffect(() => {
		const all = document.getElementById("all")?.getBoundingClientRect().width;
		const completed = document
			.getElementById("completed")
			?.getBoundingClientRect().width;
		const running = document
			.getElementById("running")
			?.getBoundingClientRect().width;

		if (!all || !completed || !running) throw Error("unable to get elements");

		setCenters({
			all: all / 2,
			completed: all + completed / 2,
			running: all + completed + running / 2,
		});
	}, []);

	return (
		<div className={styles.controls}>
			<span className={styles.dot} style={{ left: centers[filters] }}></span>
			<div id="all" onClick={() => setFilter("all")} className={styles.item}>
				All
			</div>

			<div
				id="completed"
				onClick={() => setFilter("completed")}
				className={styles.item}>
				Completed
			</div>
			<div
				id="running"
				onClick={() => setFilter("running")}
				className={styles.item}>
				Running
			</div>
		</div>
	);
};

//  IMPLEMENTATION USING FRAMER MOTION

// import { AnimateSharedLayout, motion } from "framer-motion";
// const BottomControls = ({ setFilter, filters }: BottomControlsProps) => {
// 	return (
// 		<div className={styles.controls}>
// 			<AnimateSharedLayout>
// 				<div id="all" onClick={() => setFilter("all")} className={styles.item}>
// 					All
// 					{filters === "all" && (
// 						<motion.span className={styles.dot} layoutId="dot"></motion.span>
// 					)}
// 				</div>

// 				<div
// 					id="completed"
// 					onClick={() => setFilter("completed")}
// 					className={styles.item}>
// 					Completed
// 					{filters === "completed" && (
// 						<motion.span className={styles.dot} layoutId="dot"></motion.span>
// 					)}
// 				</div>
// 				<div
// 					id="running"
// 					onClick={() => setFilter("running")}
// 					className={styles.item}>
// 					{filters === "running" && (
// 						<motion.span className={styles.dot} layoutId="dot"></motion.span>
// 					)}
// 					Running
// 				</div>
// 			</AnimateSharedLayout>
// 		</div>
// 	);
// };

export default BottomControls;
