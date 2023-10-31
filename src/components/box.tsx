import '../style/box.css'

type BoxProps = {
    children: React.ReactNode;
}

function Box({ children }: BoxProps) {
    return (
        <div className="box">
            {children}
        </div>
    );
}


export default Box;