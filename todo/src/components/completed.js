function Completed(completed) {
    if (completed) {
        return <span className="made">Сделано</span>;
    } else {
        return <span className="noMade">Не сделано</span>;
    }
}
export default Completed;
