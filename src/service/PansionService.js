export default class PansionService {
  /////////////////////DEPARTMENTS//////////////////////////////////////////////////////////////////

  //GETDEPARTMENT
  getDepartment = async () => {
    return this.doRequestAndParse("/departments/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
    });
  };

  //CREATE DEPARTMENT
  createDepartment = async ({ title, description }) => {
    return this.doRequestAndParse("/departments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({ title, description }),
    });
  };

  //UPDATEDEPARTMENT
  updateDepartment = async ({ id, title, description }) => {
    return await this.doRequestAndParse(`/departments/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({ title, description }),
    });
  };

  //DELETEDEPARTMENT
  deleteDepartment = async (id) => {
    const res = await fetch(`departments/${id}/`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });

    if (!res.ok) {
      return {
        hasError: true,
        data: { detail: "Произошла ошибка при удалении филиала" },
      };
    } else {
      return {
        hasError: false,
        data: { detail: "Филиал успешно удален из списка" },
      };
    }
  };

  //////////////////////USERS/////////////////////////////////////////////////////////////////////////

  //GETUSERS
  getUsers = async () => {
    return await this.doRequestAndParse("/users/", {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };

  //CREATEUSERS
  createUser = async ({ username, password, first_name, last_name, role }) => {
    let userBody = { username, password, first_name, last_name, role };
    console.log("gettt:", getAccessToken());
    return await this.doRequestAndParse("/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify(userBody),
    });
  };

  //UPDATEUSERS
  updateUser = async ({
    id,
    username,
    password,
    first_name,
    last_name,
    role,
  }) => {
    let userBody = { username, password, first_name, last_name, role };

    if (password) {
      userBody.password = password;
    }

    return await this.doRequestAndParse(`/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify(userBody),
    });
  };

  //DELETEUSER
  deleteUser = async (id) => {
    const res = await fetch(`/users/${id}/`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });

    if (!res.ok) {
      return { hasError: true };
    } else {
      return { hasError: false };
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  //GETEMPLOYEES
  getEmployees = async () => {
    console.log("console::", getAccessToken());
    return await this.doRequestAndParse("http://159.65.125.72/api/employees/", {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };

  //CREATEEMPLOYEE
  createEmployees = async ({ first_name, last_name, department, position}) => {
    return await this.doRequestAndParse("/employees/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        first_name,
        last_name,
        department,
        position,
      }),
    });
  };

  //DELETEEMPLOYEE
  deleteEmployees = async (id) => {
    const res = await fetch(`/employees/${id}/`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });

    if (!res.ok) {
      return { hasError: true };
    } else {
      return { hasError: false };
    }
  };

  //UPDATEEMPLOYEE
  updateEmployee = async ({
    id,
    first_name,
    last_name,
    department,
    position
  }) => {
    let userBody = { first_name, last_name, department, position };

    return await this.doRequestAndParse(`/employees/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify(userBody),
    });
  };

  //////////////////ROOMS//////////////////////////////////////////////////////////////////////////////////

  //GETROOMS
  getRooms = async () => {
    return await this.doRequestAndParse("/rooms/", {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };

  //REQUEST_TO_SERVER
  doRequestAndParse = async (url, options) => {
    try {
      let hasError = false;

      const res = await fetch(url, options);
      if (!res.ok) {
        hasError = true;
      }
      console.log("ft:", res);

      const data = await res.json();

      return { hasError, data };
    } catch (e) {
      return { hasError: true, data: { detail: e.message.toString() } };
    }
  };
}
const getAccessToken = () => localStorage.getItem("access_token_pansion");
