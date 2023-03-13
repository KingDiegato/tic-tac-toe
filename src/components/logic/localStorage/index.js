export const removeLocal = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}

export const saveLocal = (newBoard, newTurn) => {
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
}
