const sortDataByTime = (data, category) => {
    console.log(data, 'data');

    const filter = data?.filter(d => {
        if (d[`${category}`]) {
            return d;
        }
    });
    const sortData = filter?.sort((a, b) => {
        return b[`${category}`] - a[`${category}`];
    })
    console.log(sortData, 'xx');

    return sortData;
}

export default sortDataByTime;