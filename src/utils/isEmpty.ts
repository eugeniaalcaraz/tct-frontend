export const isEmpty = (object) => {
    return (Object.values(object).every(
        (x) => x === null || x === "" || x===false|| (<unknown[]>x)?.length === 0
    ))
}