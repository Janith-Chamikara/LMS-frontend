// import { FC, useState } from "react";
// import useFetchData from "../hooks/useFetchData";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import { Link } from "react-router-dom";
// import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

// const AvatarRenderer = ({ value }: { value: string }) => (
//   <Flex
//     height={"100%"}
//     width={"100%"}
//     justifyContent={"center"}
//     alignItems={"center"}
//   >
//     <Link to={value}>
//       <img
//         alt={`${value} Flag`}
//         src={value}
//         style={{
//           display: "block",
//           width: "50px",
//           filter: "brightness(1.1)",
//         }}
//       />
//     </Link>
//   </Flex>
// );

// const DataGrid: FC = () => {
//   const [colDefs, setColDefs] = useState([
//     { field: "avatar", cellRenderer: AvatarRenderer },
//     { field: "name" },
//     { field: "_id" },
//     { field: "email" },
//     { field: "createdAt" },
//     { field: "updatedAt" },
//     { field: "courses" },
//   ]);
//   const [data] = useFetchData("/auth/admin/get-all-users");
//   console.log(data);
//   const rowData = data?.users?.map((item) => ({
//     name: item.name,
//     _id: item._id,
//     email: item.email,
//     createdAt: item.createdAt,
//     updatedAt: item.updatedAt,
//     avatar: item.avatar.url,
//     courses: item.courses.map((course) => course.course_id),
//   }));
//   const color = useColorModeValue("ag-theme-quartz","ag-theme-quartz-dark")
//   console.log(rowData);
//   return (
//     <Box padding={"20px"} className={color} width={"100vw"} height={'100vh'}>
//       <AgGridReact
//         onSelectionChanged={(e) => console.log("changed row selection")}
//         rowSelection="multiple"
//         pagination={true}
//         rowData={rowData}
//         columnDefs={colDefs}
//       />
//     </Box>
//   );
// };

// export default DataGrid;

import { FC, useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import useToastHook from "../hooks/useToast";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCourseSchema, updateUserRoleSchema } from "../schemas/schema";
import CustomTextInput from "./CustomTextInput";
import AvatarRenderer from "./AvatarRenderer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UsersGrid: FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(updateUserRoleSchema) });
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    index: undefined,
    role: "",
    name: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  console.log(selectedUser);
  const [newToast] = useToastHook();

  const deleteUser = async () => {
    try {
      setIsDeleting(true);
      const response = await axiosPrivate.delete(
        `/auth/admin/delete-a-user/${selectedUser.id}`
      );

      console.log(response);
      newToast({ message: response.data.message, condition: "success" });
      setRowData([
        ...rowData.slice(0, selectedUser.index),
        ...rowData.slice(selectedUser.index + 1),
      ]);
      setIsDeleting(false);
    } catch (error) {
      newToast({ message: error.response.data.message, condition: "error" });
    }
  };
  const updateUserRole = async (data: FieldValues) => {
    console.log(data);
    const { role } = data;
    try {
      const response = await axiosPrivate.put(
        `/auth/admin/update-user-role/${selectedUser.id}`,
        {
          role,
          id: selectedUser.id,
        }
      );
      console.log(response);
      newToast({ message: response.data.message, condition: "success" });
      setRowData([
        ...rowData.slice(0, selectedUser.index),
        {
          ...response.data.updatedUser,
          avatar: response.data.updatedUser.avatar.url,
          courses: response.data.updatedUser.courses.map(
            (course) => course.course_id
          ),
        },
        ...rowData.slice(selectedUser.index + 1),
      ]);
    } catch (error) {
      console.log(error);
      newToast(error.response.data.message);
    }
  };

  const onRowClicked = (params: object) => {
    console.log(params);
    setSelectedUser({
      id: params.data._id,
      name: params.data.name,
      index: params.rowIndex,
      role: params.data.roles,
    });
  };
  const [colDefs, setColDefs] = useState([
    { field: "avatar", cellRenderer: AvatarRenderer },
    { field: "name", filter: true },
    { field: "_id", headerName: "User ID", filter: true },
    { field: "email", filter: true },
    { field: "roles", headerName: "User Role", filter: true },
    { field: "createdAt" },
    { field: "updatedAt" },
    { field: "courses", headerName: "Paid Courses" },
  ]);
  const [data] = useFetchData("/auth/admin/get-all-users");
  const [rowData, setRowData] = useState<Array<object>>();
  useEffect(() => {
    if (data) {
      setRowData(
        data?.users?.map((item) => ({
          name: item.name,
          _id: item._id,
          email: item.email,
          roles: item.roles,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          avatar: item.avatar.url,
          courses: item.courses.map((course) => course.course_id),
        }))
      );
    }
  }, [data]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const color = useColorModeValue("ag-theme-quartz", "ag-theme-quartz-dark");
  return (
    <Box
      paddingX={"20px"}
      mb={"20px"}
      className={color}
      width={"99vw"}
      height={"90vh"}
    >
      <Heading fontSize={"4xl"} mb={"2"}>
        Manage Users
      </Heading>
      <Flex my={"10px"} justify={"center"} alignItems={"center"}>
        <Button colorScheme="yellow" width={"100%"} onClick={onOpen}>
          Select row and click here to update data
        </Button>
      </Flex>
      <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={"auto"} backdropBlur={"8px"} />
        <ModalContent>
          {selectedUser.id ? (
            <>
              <ModalHeader>
                Update User Roles
                <Text
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  fontStyle={"italic"}
                >
                  (ID - {selectedUser.id})
                </Text>
                <Text
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  fontStyle={"italic"}
                >
                  Name - {selectedUser.name}
                </Text>
                <Text
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  fontStyle={"italic"}
                >
                  Current Role - {selectedUser.role}
                </Text>
              </ModalHeader>

              <ModalCloseButton />
              <ModalBody pb={6}>
                <CustomTextInput
                  errors={errors}
                  register={register}
                  name="role"
                  placeholder="Enter new user role "
                  type="text"
                  isRequired={false}
                >
                  New Role
                </CustomTextInput>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  disabled={isSubmitSuccessful}
                  isLoading={isSubmitting}
                  loadingText={"Updating User"}
                  onClick={handleSubmit(updateUserRole)}
                  colorScheme="blue"
                  mr={3}
                >
                  Update
                </Button>

                <Button
                  type="button"
                  disabled={isSubmitSuccessful}
                  isLoading={isSubmitting}
                  loadingText={"Deleting User"}
                  onClick={deleteUser}
                  colorScheme="red"
                  mr={3}
                >
                  Delete
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalHeader
                padding={"50px"}
                textColor={"red.300"}
                textAlign={"center"}
              >
                Please first select the User you want to update from the grid
              </ModalHeader>
              <ModalCloseButton />
            </>
          )}
        </ModalContent>
      </Modal>

      <AgGridReact
        onRowSelected={onRowClicked}
        pagination={true}
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={"single"}
      />
    </Box>
  );
};

export default UsersGrid;
