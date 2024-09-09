import {dataRoutesValues} from "models/values/DataRoutesValues";

const numItems = dataRoutesValues.length;
const dataTitle1 = dataRoutesValues[0].title;
const dataAccessRights = dataRoutesValues[0].accessRights;
const dataPath = dataRoutesValues[0].path;

describe("Length of the array",  () => {
    test("Number of items to be 12", async () => {
        expect(numItems).toBe(12);
    });// Should return true

    test("Number of items to be grater or equal than 12",  () => {
        expect(numItems).toBeGreaterThanOrEqual(12);
    });// Should return true
});

describe("Match title on the property 'title'", () => {
    test("There is an Admins in this title", async () => {
        expect(dataTitle1).toMatch(/Admins/);
    });
});

describe("Has an access right of ADMINS_READ",  () => {
    test("Needs an access right of ADMINS_READ", async () => {
        expect(dataAccessRights).toMatch(/ADMINS_READ/);
    });
});

describe("Has a path /admins",  () => {
    test("Admins has a path /admins", async () => {
        expect(dataPath).toContain("/admins");
    });
});

describe("Mapping array",  () => {
    //Arrays
    test("Mapping through dataRoutesValues.ts", async () => {
        expect(dataRoutesValues).toEqual(expect.arrayContaining(dataRoutesValues));
    });
});

describe("Property title",  () => {
    //Object
    test("To have property title", async () => {
        expect(dataRoutesValues[0]).toHaveProperty("title");
    });
});

describe("Properties and values of an Object",  () => {
    // Properties and values of an Object
    test("First route to have title and value ADMINS_READ", async () => {
        expect(dataRoutesValues[0]).toHaveProperty("accessRights", "ADMINS_READ");
    });
});


