function watermanCrown(pointTable) {
    const WatermanCrown = pointTable?.filter((d) => {
        if (d.WatermanCrown) {
            return d
        }
    })
    const sortedWatermanCrown = WatermanCrown.sort((a, b) => {
        return (a.Wingfoil + a.Windfoil + a.dw) - (b.Wingfoil + b.Windfoil + b.dw)
    })
    return sortedWatermanCrown;
}

export default watermanCrown;