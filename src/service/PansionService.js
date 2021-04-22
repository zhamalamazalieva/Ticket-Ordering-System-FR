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
      method: "PUT",
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

  /////////////////////EMPLOYEES//////////////////////////////////////////////////////////////////////
  //GETEMPLOYEES
  getEmployees = async () => {
    console.log("console::", getAccessToken());
    return await this.doRequestAndParse("http://159.65.125.72/api/employees/", {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };
  //GETEMPLOYEEBYPOSITIONID
  getEmployeesByPositionId = async (positionId) => {
    return await this.doRequestAndParse(`/room-categories/${positionId}/`, {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };

  //CREATEEMPLOYEE
  createEmployees = async ({ first_name, last_name, department, position }) => {
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
    position,
  }) => {
    let userBody = { first_name, last_name, department, position };

    return await this.doRequestAndParse(`/employees/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify(userBody),
    });
  };

  ///////////////////////ROOMS//////////////////////////////////////////////////////////////////////

  //GETROOMS
  getRooms = async (category_id) => {
    return await this.doRequestAndParse("/rooms/", {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };

  //GETROOMDETAILS
  getRoomDetails = async (id) => {
    return await this.doRequestAndParse(`/rooms/${id}/`, {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };

  //GETROOMSBYCATEGORYID
  getRoomsByCategoryId = async (categoryId) => {
    return await this.doRequestAndParse(`/room-categories/${categoryId}/`, {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };

  //DELETEROOMS
  deleteRooms = async (id) => {
    const res = await fetch(`/rooms/${id}/`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
    if (!res.ok) {
      console.log("res:", res);
      return { hasError: true };
    } else {
      return { hasError: false };
    }
  };

  //CREATEROOM
  createRoom = async ({
    title,
    description,
    seats,
    category,
    latitude,
    longitude,
  }) => {
    return await this.doRequestAndParse("/rooms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        title,
        description,
        seats,
        category,
        latitude,
        longitude,
      }),
    });
  };
  //UPDATEROOM
  updateRoom = async ({ id, title, description, seats, category }) => {
    return await this.doRequestAndParse(`/rooms/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        title,
        description,
        seats,
        category,
      }),
    });
  };

  //////////////ROOMCATEGORIES//////////////////////////////////////////////////////////////

  //GETROOMCATEGORIES
  getCategories = async () => {
    return await this.doRequestAndParse("/room-categories/", {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };
  //DELETEROOMCATEGORY
  deleteCategory = async (id) => {
    const res = await fetch(`/room-categories/${id}/`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
    if (!res.ok) {
      console.log("res:", res);
      return { hasError: true };
    } else {
      return { hasError: false };
    }
  };
  //CREATEROOMCATEGORY
  createCategory = async (title, description) => {
    return await this.doRequestAndParse("/room-categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  };
  //UPDATEROOMCATEGORY
  updateCategory = async ({ id, title, description }) => {
    return await this.doRequestAndParse(`/room-categories/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  };

  //////////////////FLOWS/////////////////////////////////////////////////////////////////////
  //GETFLOWS
  getFlows = async () => {
    return await this.doRequestAndParse("/flows/", {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };
  //DELETEFLOW
  deleteFlow = async (id) => {
    const res = await fetch(`/flows/${id}/`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
    if (!res.ok) {
      console.log("res:", res);
      return { hasError: true };
    } else {
      return { hasError: false };
    }
  };
  //CREATEFLOW
  createFlow = async (start_date, end_date, title, description) => {
    return await this.doRequestAndParse("/flows/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: " Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        start_date,
        end_date,
        title,
        description,
      }),
    });
  };
  //UPDATEFLOW
  updateFlow = async ({ id, start_date, end_date, title, description }) => {
    return await this.doRequestAndParse(`/flows/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        start_date,
        end_date,
        title,
        description,
      }),
    });
  };


  //////////////////POSITIONS/////////////////////////////////////////////////////////////////////
  //GETPOSITIONS
  getPositions = async () => {
    return await this.doRequestAndParse("/positions/", {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };

  //DELETEPOSITIONS  
  deletePosition = async (id) => {
    const res = await fetch(`/positions/${id}/`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
    if (!res.ok) {
      console.log("res:", res);
      return { hasError: true };
    } else {
      return { hasError: false };
    }
  };
  //CREATEPOSITIONS
  createPosition = async (title, description) => {
    return await this.doRequestAndParse("/positions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: " Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  };
  //UPDATEPOSITIONS
  updatePosition = async ({ id,title, description }) => {
    return await this.doRequestAndParse(`/positions/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  };
  //////////////REQUEST_TO_SERVER////////////////////////////////////////////////////////////
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
