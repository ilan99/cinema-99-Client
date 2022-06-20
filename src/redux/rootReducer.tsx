const initState = {
  validLogin: false,
  home: true,
  userId: "",
  userName: "",
  firstName: "",
  lastName: "",
  permissions: [],
  editPermissions: [],
  crossFind: false,
  clickAll: false,
  displayBar: true,
  displayFind: true,
  sort: "",
  editUserId: "",
  editMovieId: "",
  editMemberId: "",
  subscriptionCounter: 0,
};

const checkSetView = (editPermissions: Array<any>, index: number) => {
  const { permission } = editPermissions[index];
  const arrPermission = permission.split(" ");
  const prefix = arrPermission[0];

  switch (prefix) {
    case "Create":
    case "Delete":
    case "Update":
      const view = `View ${arrPermission[1]}`;
      const viewPermission = editPermissions.find(
        (obj) => obj.permission === view
      );
      return editPermissions.indexOf(viewPermission);

    default:
      break;
  }
};

const checkUnsetView = (editPermissions: Array<any>, index: number) => {
  const { permission } = editPermissions[index];
  const arrPermission = permission.split(" ");
  const prefix = arrPermission[0];

  if (prefix !== "View") return -1;

  const crt = `Create ${arrPermission[1]}`;
  const del = `Delete ${arrPermission[1]}`;
  const upd = `Update ${arrPermission[1]}`;

  const crtPer = editPermissions.find(
    (per) => per.permission === crt && per.checked === true
  );
  const delPer = editPermissions.find(
    (per) => per.permission === del && per.checked === true
  );
  const updPer = editPermissions.find(
    (per) => per.permission === upd && per.checked === true
  );

  if (crtPer || delPer || updPer) {
    return index;
  } else {
    return -1;
  }
};

const rootReducer = (state = initState, action: any) => {
  switch (action.type) {
    // General
    case "SET_DISPLAY_BAR":
      return { ...state, displayBar: action.value };

    case "SET_CLICK_ALL":
      return { ...state, clickAll: action.value };

    case "SET_CROSS_FIND":
      return { ...state, crossFind: action.value };

    case "SET_HOME":
      return { ...state, home: action.value };

    // Users
    case "SET_VALID_LOGIN":
      return { ...state, validLogin: action.value };

    case "SET_USER_DATA":
      const { userId, userName, firstName, lastName } = action;
      return { ...state, userId, userName, firstName, lastName };

    case "SET_USER_PERMISSIONS":
      return { ...state, permissions: action.permissions };

    case "SET_EDIT_USER_ID":
      return { ...state, editUserId: action.userId };

    case "SET_INIT_PERMISSIONS_LIST":
      return { ...state, editPermissions: [] };

    case "SET_EDIT_PERMISSIONS_LIST":
      const editPermission = {
        permission: action.permission,
        checked: action.checked,
      };
      const editPermissionsList = [...state.editPermissions, editPermission];
      return { ...state, editPermissions: editPermissionsList };

    case "SET_EDIT_PERMISSION":
      const { index, checked } = action;
      let editPermissions: any = [...state.editPermissions];
      editPermissions[index].checked = checked;

      if (checked) {
        const viewIndex: any = checkSetView(editPermissions, index);
        if (viewIndex >= 0) {
          editPermissions[viewIndex].checked = checked;
        }
      } else {
        const viewIndex = checkUnsetView(editPermissions, index);
        if (viewIndex >= 0) {
          editPermissions[viewIndex].checked = !checked;
        }
      }
      return { ...state, editPermissions };

    // Movies
    case "SET_EDIT_MOVIE_ID":
      return { ...state, editMovieId: action.movieId };

    case "SET_DISPLAY_FIND":
      return { ...state, displayFind: action.value };

    case "SET_SORT":
      return { ...state, sort: action.value };

    // Subscriptions
    case "SET_EDIT_MEMBER_ID":
      return { ...state, editMemberId: action.memberId };

    case "INCREASE_COUNTER":
      return { ...state, subscriptionCounter: ++state.subscriptionCounter };

    default:
      return state;
  }
};

export default rootReducer;
