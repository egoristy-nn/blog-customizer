import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import React, { useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	state: ArticleStateType;
	setState: (state: ArticleStateType) => void;
};
export const ArticleParamsForm = ({
	state,
	setState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(true);
	const [selectState, setSelectState] = useState<ArticleStateType>(state);

	const inputChangeHandler = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState(selectState);
	};

	const formResetHandler = () => {
		setState(defaultArticleState);
		setSelectState(defaultArticleState);
	};

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		onChange: setIsOpen,
		rootRef,
		onClose: () => {
			setIsOpen;
		},
	});

	return (
		<>
			<div className='container' ref={rootRef}>
				<ArrowButton
					isOpen={isOpen}
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				/>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form} onSubmit={formSubmitHandler}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>
							Задайте параметры
						</Text>
						<div className={styles.selectContainer}>
							<Select
								options={fontFamilyOptions}
								placeholder='Open Sans'
								selected={selectState.fontFamilyOption}
								onChange={(e) => {
									inputChangeHandler('fontFamilyOption', e);
								}}
								title='Шрифт'
							/>
						</div>
						<div className={styles.radioContainer}>
							<RadioGroup
								name='fontColor'
								options={fontSizeOptions}
								selected={selectState.fontSizeOption}
								onChange={(e) => {
									inputChangeHandler('fontSizeOption', e);
								}}
								title='Размер шрифта'
							/>
						</div>

						<div className={styles.selectContainer}>
							<Select
								options={fontColors}
								placeholder='Черный'
								selected={selectState.fontColor}
								onChange={(e) => {
									inputChangeHandler('fontColor', e);
								}}
								title='Цвет шрифта'
							/>
						</div>
						<Separator />
						<div className={styles.selectContainer}>
							<Select
								options={backgroundColors}
								placeholder='Черный'
								selected={selectState.backgroundColor}
								onChange={(e) => {
									inputChangeHandler('backgroundColor', e);
								}}
								title='Цвет фона'
							/>
						</div>
						<div className={styles.selectContainer}>
							<Select
								options={contentWidthArr}
								placeholder='Черный'
								selected={selectState.contentWidth}
								onChange={(e) => {
									inputChangeHandler('contentWidth', e);
								}}
								title='Ширина контента'
							/>
						</div>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={formResetHandler}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
