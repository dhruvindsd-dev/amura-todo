import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { BaseSyntheticEvent, useMemo, useRef, useState } from "react";
import Input from "../components/Form/Input/Input";
import BottomControls from "../components/Pages/Todo/BottomControls";
import ChecklistItem from "../components/Pages/Todo/ChecklistItem";
import styles from "../styles/Home.module.scss";
import debounce from "../utils/debounce";

const Home: NextPage = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [search, setSearch] = useState<{ isActive: boolean; val?: string }>({
		isActive: false,
	});
	const [filter, setFilter] = useState<filterTypes>("all");

	const [todos, setTodos] = useState<checkItemType[]>([
		{
			text: "Item 1 ",
			id: 1,
			isChecked: true,
		},
	]);

	const handleAddItem = () => {
		const val = inputRef.current?.value;
		if (!val) return;
		const id = todos.length > 0 ? todos[0].id + 1 : 0;

		setTodos([{ text: val, isChecked: false, id }, ...todos]);
		inputRef.current.value = "";
		setSearch({ isActive: true });
	};

	const handleDelete = (idx: number) => {
		const updatedTodos = [...todos];
		updatedTodos.splice(idx, 1);
		setTodos(updatedTodos);
	};

	const handleToggleCheck = (idx: number) => {
		const updatedTodos = [...todos];
		updatedTodos[idx].isChecked = !updatedTodos[idx].isChecked;
		setTodos(updatedTodos);
	};

	const handleSearch = debounce((e: BaseSyntheticEvent) => {
		setSearch({ isActive: true, val: e.target.value });
	}, 500);

	const filterTodos = useMemo(() => {
		let toReturn;
		toReturn = todos.filter(({ isChecked }) => {
			if (filter === "all") return true;
			else if (filter === "completed") return isChecked === true;
			else if (filter === "running") return isChecked === false;
		});

		if (!!search.val)
			toReturn = toReturn.filter(({ text }) => text.includes(search.val!));

		return toReturn;
	}, [filter, todos, search.val]);

	return (
		<>
			<Head>
				<title>Amura sample todo list</title>
			</Head>
			<section className={styles.wrapper}>
				<div className={styles.container}>
					<header>
						<p>To Do List</p>
					</header>
					<section className={styles.main_body}>
						<Input
							onChange={search.isActive ? handleSearch : undefined}
							ref={inputRef}
							icon={
								search.isActive ? (
									<></>
								) : (
									<img onClick={handleAddItem} src="/icons/search-tick.svg" />
								)
							}
							disableTopMargin
							label={search.isActive ? "Search ..." : "Add Item"}
						/>
						<br />

						<AnimatePresence exitBeforeEnter>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								key={filter}
								className={styles.checklist_item_wrapper}>
								{filterTodos.length === 0 && (
									<div className={styles.no_items}>
										<div className="text-size-3">~(˘▾˘~)</div>
										<br />
										{search.val ? "No Tasks found" : "Yaay, you got no tasks"}
									</div>
								)}

								{filterTodos.map((todo, idx) => (
									<ChecklistItem
										handleToggleCheck={() => handleToggleCheck(idx)}
										handleDelete={() => handleDelete(idx)}
										{...todo}
										key={todo.id}
									/>
								))}
							</motion.div>
						</AnimatePresence>
						<section className={styles.bottom}>
							<div
								onClick={() => setSearch({ isActive: !search.isActive })}
								className={styles.add}>
								<motion.img
									animate={{ rotate: search.isActive ? 0 : 45 }}
									src="/icons/add.svg"
									alt=""
								/>
							</div>
							<div className={styles.text}>{filterTodos.length} Items</div>
							<BottomControls filters={filter} setFilter={setFilter} />
						</section>
					</section>
				</div>
			</section>
		</>
	);
};

export default Home;
