import { FC, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Box,
  Button,
  Flex,
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
import { axiosPrivate } from "../axios/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCourseSchema } from "../schemas/schema";
import CustomTextInput from "./CustomTextInput";
import { convertToBase64 } from "../utils/utils";
const CoursesGrid: FC = () => {
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(updateCourseSchema) });
  const [currentCourse, setCurrentCourse] = useState({
    id: null,
    name: "",
    level: "",
    thumbnail: "",
  });
  console.log(currentCourse);
  const [newToast] = useToastHook();
  const updateCourse = async (data: object) => {
    console.log(data);
    const thumbnail = await convertToBase64(data.thumbnail["0"]);
    const { name, price, level } = data;
    try {
      const response = await axiosPrivate.put(
        `/courses/update/${currentCourse.id}`,
        {
          name,
          price,
          level,
          thumbnail,
        }
      );
      console.log(response);
      newToast({ message: response.data.message, condition: "success" });
    } catch (error) {
      console.log(error);
      newToast(error.data.message);
    }
  };

  const onRowClicked = (params: object) => {
    console.log(params);
    setCurrentCourse({
      id: params.data._id,
      name: params.data.name,
      level: params.data.level,
      thumbnail: params.data.thumbnail,
    });
  };
  const [colDefs, setColDefs] = useState([
    { field: "thumbnail" },
    {
      field: "name",
    },
    { field: "_id" },
    { field: "price" },
    { field: "createdAt" },
    { field: "updatedAt" },
    { field: "level" },
  ]);
  const [data] = useFetchData("/courses/auth/admin/get-all-courses");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const rowData = data?.courses?.map((course) => ({
    name: course.name,
    _id: course._id,
    price: course.price,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    thumbnail: course.thumbnail?.url,
    level: course.level,
  }));

  const color = useColorModeValue("ag-theme-quartz", "ag-theme-quartz-dark");
  return (
    <Box paddingX={"20px"} mb={'20px'} className={color} width={"99vw"} height={"90vh"}>
      <Flex  my={"10px"} justify={"center"} alignItems={"center"}>
        <Button colorScheme="yellow" width={"100%"} onClick={onOpen}>
          Select row and click here to update data
        </Button>
      </Flex>
      <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {currentCourse.id ? (
            <>
              <ModalHeader>
                Update Course Data
                <Text
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  fontStyle={"italic"}
                >
                  (ID - {currentCourse.id})
                </Text>
              </ModalHeader>

              <ModalCloseButton />
              <ModalBody pb={6}>
                <CustomTextInput
                  errors={errors}
                  register={register}
                  name="name"
                  placeholder="Enter new course Name "
                  type="text"
                  isRequired={false}
                >
                  Name
                </CustomTextInput>
                <CustomTextInput
                  errors={errors}
                  register={register}
                  name="price"
                  placeholder="Enter new price "
                  type="text"
                  isRequired={false}
                >
                  Price
                </CustomTextInput>
                <CustomTextInput
                  errors={errors}
                  register={register}
                  name="estimatedPrice"
                  placeholder="Enter new estimated price"
                  type="text"
                  isRequired={false}
                >
                  Estimated Price
                </CustomTextInput>
                <CustomTextInput
                  errors={errors}
                  register={register}
                  name="level"
                  placeholder="Enter new course level "
                  type="text"
                  isRequired={false}
                >
                  Level
                </CustomTextInput>
                <CustomTextInput
                  flushed={true}
                  errors={errors}
                  register={register}
                  name="thumbnail"
                  placeholder="Provide a thumbnail for the course"
                  type="file"
                  isRequired={false}
                >
                  Thumbnail
                </CustomTextInput>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  disabled={isSubmitSuccessful}
                  isLoading={isSubmitting}
                  loadingText={"Updating Course"}
                  onClick={handleSubmit(updateCourse)}
                  colorScheme="blue"
                  mr={3}
                >
                  Update
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
                Please first select the course you want to update from the grid
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

export default CoursesGrid;
