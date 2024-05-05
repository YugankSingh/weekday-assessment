import React from "react"
import styles from "./CustomChip.module.scss"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

interface CustomChipProps {
	onRemove: (e: any) => void
	text: string
	className?: string
}

function CustomChip({ onRemove, text, className = "" }: CustomChipProps) {
	return (
		<span className={styles.wrapper + " " + className}>
			<p className={styles.text}>{text}</p>
			<button
				style={{}}
				onClick={e => onRemove(e)}
				onMouseDown={event => event.stopPropagation()}
			>
				<CloseRoundedIcon sx={{ width: "14px", height: "14px" }} />
				{/* <img src={crossIcon} alt="x" className={styles.button} /> */}
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
			</button>
		</span>
	)
}

export default CustomChip
