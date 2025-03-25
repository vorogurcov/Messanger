import style from "./loader.module.scss"

const Loader = ({styles}: {styles?: React.CSSProperties | undefined}) => {
    return (
        <div className={style.loader} style={styles}/>
    );
}

export default Loader