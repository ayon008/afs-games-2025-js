// Centralized copy constants for the app
export const OLD_AFS_GAMES_DATE_SENTENCE = 'The AFS Games will take place *from October 12 to November 16, 2025*. Any participation outside this period will not be taken into account.';
export const NEW_AFS_GAMES_DATE_SENTENCE = 'The AFS Games will take place *from October 20 to December 8, 2025*. Any participation outside this period will not be taken into account.';

export function replaceAfsGamesDate(description = '') {
    // Exact replacement to preserve formatting; centralized here for easy updates
    return description.replaceAll(OLD_AFS_GAMES_DATE_SENTENCE, NEW_AFS_GAMES_DATE_SENTENCE);
}

const copy = {
    OLD_AFS_GAMES_DATE_SENTENCE,
    NEW_AFS_GAMES_DATE_SENTENCE,
    replaceAfsGamesDate,
};

export default copy;
