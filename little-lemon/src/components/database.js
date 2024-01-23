import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');


export const createTable = async (onSuccess) => {
    db.transaction(tx => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY, 
            name TEXT, description TEXT, price INTEGER, category TEXT, image TEXT)`,
            [],
            onSuccess,
            (_, error) => console.log('table creation failed:', error)
        );
    })
}

export const getMenuItems = async () => {
    return new Promise((resolve) => {
        db.transaction(tx => {
            tx.executeSql("SELECT name, description, price, category, image FROM menu", 
                [],
                (_, { rows }) => resolve(rows._array),
                (_, error) => console.log("can't get menu items: ", error)
            )
        })
    });
  }

export const storeMenu = (menu) => {
    db.transaction(tx => {
        menu.forEach((element) => {
            tx.executeSql('INSERT INTO menu (name, description, price, category, image) VALUES (?,?,?,?, ?)',
                [element.name, element.description, element.price * 100, element.category, element.image],
                null,
                (_, error) => console.log('insertion failed', error)
            )
        })
    })
}