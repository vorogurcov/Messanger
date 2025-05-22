import { HTMLAttributes } from 'react';
import css from './css.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    label: string;
}

export default function BlueScroll({ label, className, ...props }: Props) {
    return (
        <div className={`${css.assignedTitle} ${className}`} {...props}>
            <b>{label}</b>
        </div>
    );
}
