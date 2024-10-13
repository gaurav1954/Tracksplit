// avatarUtils.js
export function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    const nameParts = name.split(' '); // Split by space
    const initials =
        nameParts.length === 1 // Check if only first name is provided
            ? nameParts[0][0].toUpperCase() // Use the first letter of the first name and ensure it's uppercase
            : `${nameParts[0][0].toUpperCase()}${nameParts[1][0].toUpperCase()}`; // Use the first letters of both names and ensure uppercase

    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: initials,
    };
}

