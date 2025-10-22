import { getApp } from '@react-native-firebase/app';
import { ExpenseType } from '../../../utils/typeConfig';
import {
  collection,
  doc,
  FieldValue,
  FirebaseFirestoreTypes,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from '@react-native-firebase/firestore';
import { eventChannel } from 'redux-saga';

export const saveExpenseApi = async (
  payload: ExpenseType[],
  userDocid: string,
) => {
  try {
    const app = getApp(); // get the default Firebase app
    const db = getFirestore(app); // get Firestore instance

    const batch = writeBatch(db); // modular batch

    const expensesCollection = collection(
      db,
      'userInformation',
      userDocid,
      'expensesInformation',
    );

    payload.forEach(expense => {
      const expenseDoc = doc(expensesCollection, expense.id); // document reference
      batch.set(expenseDoc, expense);
    });

    await batch.commit(); // commit batch

    return true;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
};

// export const deleteExpenseApi = async (
//   userDocId: string,
//   expenseId: string,
// ) => {
//   try {
//     await firestore()
//       .collection('userInformation')
//       .doc(userDocId)
//       .collection('expensesInformation')
//       .doc(expenseId)
//       .delete();
//   } catch (e) {
//     if (e instanceof Error) {
//       throw new Error(e.message);
//     } else {
//       throw new Error(String(e));
//     }
//   }
// };

export const updateExpense = async (
  docId: string,
  expense: number,
  total: number,
  income: number,
) => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    const docRef = doc(db, 'userInformation', docId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const oldExpense = data?.expense ?? 0;
    const oldIncome = data?.income ?? 0;

    const totalOld = data?.total ?? 0;
    const newExpense = oldExpense + expense;
    const newIncome = oldIncome + income;
    const newTotal = totalOld - expense + income;

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        expense: newExpense,
        total: newTotal,
        income: newIncome,
      });
    } else {
      await setDoc(
        docRef,
        {
          expense,
          total,
          income,
        },
        { merge: true },
      );
    }

    return {
      ...docSnap.data(),
      expense: newExpense,
      total: newTotal,
      income: newIncome,
    };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
};

export const GetAllExpenseData = async (userId: string) => {
  try {
    const app = getApp(); // get the default Firebase app
    const db = getFirestore(app); // get Firestore instance
    const expenseRef = collection(
      db,
      'userInformation',
      userId,
      'expensesInformation',
    );
    const querySnapshot = await getDocs(expenseRef);
    const expenses: any[] = [];
    querySnapshot.forEach((doc: { id: any; data: () => any }) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });

    return expenses;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
};
