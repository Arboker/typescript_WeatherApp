export const formData = (string) => {
    const date = string.split("-");
    const day = date[2];

    var d = new Date(string);
    var dayName = d.toString().split(' ')[0];

    return dayName+" "+day;
}

export const formatHours = (string) => {
    const newHour = string.split(" ")[1];
    return newHour;
}