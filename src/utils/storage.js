export const DEPTS = ['IT', 'HR', 'Finance', 'Sales', 'Marketing'];
const KEY = 'employees';


const NAMES = [
  'Arun Kumar', 'Arun Raj', 'Arun Prakash', 'Ravi Shankar', 'Priya Lakshmi',
  'Kumar Selvam', 'Divya Bharathi', 'Karthik Raja', 'Meena Devi', 'Suresh Babu',
  'Anitha Rani', 'Vignesh Kumar', 'Lakshmi Priya', 'Gokul Nath', 'Deepa Sri',
  'Manoj Kumar', 'Swathi Rajan', 'Harish Kumar', 'Nandhini Devi', 'Sathish Kumar',
  'Pooja Ramesh', 'Naveen Raj', 'Kavitha Sundar', 'Ramesh Babu', 'Janani Krishnan',
  'Bala Murugan', 'Revathi Devi', 'Prakash Raj', 'Sangeetha Mohan', 'Dinesh Kumar',
];
const DESIGNATIONS = {
  IT: 'Software Developer', HR: 'HR Executive', Finance: 'Accountant',
  Sales: 'Sales Executive', Marketing: 'Marketing Executive',
};

const seed = () =>
  NAMES.map((name, i) => {
    const department = DEPTS[i % 5];
    return {
      id: `EMP${String(i + 1).padStart(3, '0')}`,
      name,
      email: `${name.toLowerCase().replace(/ /g, '.')}@gmail.com`,
      phone: `98765${String(43210 + i).padStart(5, '0')}`,
      department,
      designation: DESIGNATIONS[department],
      joiningDate: `202${4 + (i % 3)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
      salary: 25000 + (i % 10) * 5000,
      status: i % 4 === 3 ? 'Inactive' : 'Active',
    };
  });


export const saveEmployees = (l) => localStorage.setItem(KEY, JSON.stringify(l));

export const getEmployees = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) {           
      const data = seed();
      saveEmployees(data);
      return data;
    }
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
};


export const isLoggedIn = () => sessionStorage.getItem('isLoggedIn') === 'true';
export const login = () => sessionStorage.setItem('isLoggedIn', 'true');
export const logout = () => sessionStorage.removeItem('isLoggedIn');