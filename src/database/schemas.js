import Realm from 'realm';

export const RECORD_SCHEMA = 'Record';

export const RecordSchema = {
  name: RECORD_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string', // primary key
    time: 'int',
    distance: 'float',
    poop: 'bool',
    pee: 'bool',
    routeCoordinates: 'string',
    poopShape: 'int',
    poopColor: 'int',
    feelScale: 'int',
    creationDate: 'date',
  },
};

const databaseOptions = {
  path: 'realmTestApp.realm',
  schema: [RecordSchema],
  schemaVersion: 0,
};

export const insertNewRecord = newRecord => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then((realm) => {
    realm.write(() => {
      realm.create(RECORD_SCHEMA, newRecord);
      resolve(newRecord);
    });
  }).catch(error => reject(error));
});

export const deleteRecord = recordId => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then((realm) => {
    realm.write(() => {
      let deletingRecord = realm.objectForPrimaryKey(RECORD_SCHEMA, recordId);
      realm.delete(deletingRecord);
      resolve();
    });
  }).catch(error => reject(error));
});

export const deleteAllRecords = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then((realm) => {
    realm.write(() => {
      let allRecords = realm.objects(RECORD_SCHEMA);
      realm.delete(allRecords);
      resolve();
    });
  }).catch(error => reject(error));
});

export const queryAllRecords = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then((realm) => {
    const allRecords = realm.objects(RECORD_SCHEMA).sorted('creationDate', false);
    resolve(allRecords);
  }).catch(error => reject(error));
});

export const queryById = recordId => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then((realm) => {
    const record = realm.objectForPrimaryKey(RECORD_SCHEMA, recordId);
    resolve(record);
  }).catch(error => reject(error));
});

export default new Realm(databaseOptions);
