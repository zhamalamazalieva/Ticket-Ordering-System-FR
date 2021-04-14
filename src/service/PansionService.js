// import { has } from "core-js/core/dict";

export default class PansionService {
 
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
  //UPDATEDEPARTMENT
  updateDepartment = async ({id, title, description}) => {
    return await this.doRequestAndParse(`/departments/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAccessToken()
        },
        body: JSON.stringify({title, description })
    })
}
  //DELETEDEPARTMENT
  deleteDepartment = async id => {
    const res = await fetch(`departments/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() }
    })

    if (!res.ok){
        return { hasError: true, data: { detail: 'Произошла ошибка при удалении филиала' } }
    } else {
        return { hasError: false, data: { detail: 'Филиал успешно удален из списка' } }
    }
}

//////////////////////////////////////////////////////////////////////////////

  //GETUSERS
  getUsers = async () => {
    return await this.doRequestAndParse(`/users/`, {
      method: "GET",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  };
  //CREATEUSERS
  createUser = async (
    first_name,
    last_name,
    username,
    role,
  ) => {
    return await this.doRequestAndParse("/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        role,
      }),
    });
  };
  //UPDATEUSERS
  updateUser = async (
    id,
    first_name,
    last_name,
    username,
    email,
    password,
    role,
    branch
  ) => {
    let body = { first_name, last_name, username, email, role, branch };

    if (password) {
      body.password = password;
    }

    return await this.doRequestAndParse(`${this._baseApi}/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken(),
      },
      body: JSON.stringify(body),
    });
  };
  deleteUser = async (id) => {
    const res = await fetch(`${this._baseApi}/users/${id}/`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + getAccessToken() },
    });

    if (!res.ok) {
      return { hasError: true };
    } else {
      return { hasError: false };
    }
  };




  doRequestAndParse = async (url, options) => {
    try {
      let hasError = false;

      const res = await fetch(url, options);

      if (!res.ok) {
        hasError = true;
      }

      const data = await res.json();

      return { hasError, data };
    } catch (e) {
      return { hasError: true, data: { detail: e.message.toString() } };
    }
  };
}

const getAccessToken = () => localStorage.getItem("access_token_pansion");
