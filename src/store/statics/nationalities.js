import array from "../../utils/array";

export default {
  getAllNationalities: () => {
    const allNationalities = [
      ["Foreing", "nontr"],
      ["Turkish Citizen", "tr"],
    ];

    for (let i = 0; i < allNationalities.length; i++) {
      const e = allNationalities[i];
      allNationalities[i] = {
        title: e[0],
        val: e[1],
      };
    }

    return array.sort(allNationalities, "title");
  },
};
