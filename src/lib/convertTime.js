function convertToFranceTime(utcDateString) {
    const date = new Date(utcDateString); // Convert string to Date object

    // Use Intl.DateTimeFormat to format the date for France (Europe/Paris time zone)
    const optionsDate = {
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const optionsTime = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const franceDate = new Intl.DateTimeFormat('fr-FR', optionsDate).format(date);
    const franceTime = new Intl.DateTimeFormat('fr-FR', optionsTime).format(date);

    return { date: franceDate, time: franceTime };
}

export default convertToFranceTime;
