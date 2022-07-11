import { motion, MotionConfig } from "framer-motion";
import React, { MouseEventHandler } from "react";
import styles from "./index.module.scss";

interface ChecklistItemProps {
	handleDelete: () => void;
	handleToggleCheck: MouseEventHandler<HTMLDivElement>;
}

const ChecklistItem = ({
	text,
	isChecked,
	handleDelete,
	handleToggleCheck,
}: ChecklistItemProps & checkItemType) => {
	const _handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		handleDelete();
	};
	return (
		<MotionConfig transition={{ duration: 0.3 }}>
			<motion.div
				// exit={{ scale: 0.5, opacity: 0 }}
				onClick={handleToggleCheck}
				className={styles.container}>
				<div
					className={`${styles.checkbox} ${
						isChecked ? styles.is_checked : ""
					}`}>
					<motion.img
						animate={{ scale: isChecked ? 1 : 0 }}
						src="/icons/tick.svg"
						className={styles.tick}
					/>
				</div>
				<div className={styles.text}>
					<span className={styles.strike_wrapper}>
						<motion.span
							initial={{ width: isChecked ? "100%" : "0%" }}
							animate={{ width: isChecked ? "100%" : "0%" }}
							className={styles.strike}></motion.span>
						{text}
					</span>
				</div>
				<motion.div
					onClick={_handleDelete}
					whileHover={{ scale: 1.2 }}
					className={styles.delete}>
					<img src="/icons/delete.svg" alt="" />
				</motion.div>
			</motion.div>
		</MotionConfig>
	);
};
export default ChecklistItem;
