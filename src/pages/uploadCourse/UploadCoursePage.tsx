import { Dispatch, FC, SetStateAction, useState } from "react";
import CustomStepper from "../../components/stepper/CustomStepper";
import { steps } from "../../components/stepper/steps";
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  useSteps,
} from "@chakra-ui/react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "../../schemas/schema";
import CustomTextInput from "../../components/CustomTextInput";
import axios from "../../axios/axios";
import useAuthContext from "../../hooks/useAuthContext";
import { convertToBase64 } from "../../utils/utils";
import useToastHook from "../../hooks/useToast";
import UploadWidget from "../../components/uploadAssests/UploadWidget.tsx";

const UploadCoursePage: FC = () => {
  const [demoUrl, setDemoUrl] = useState<string>("");
  const [sectionUrls, setSectionUrls] = useState<string[]>([]);
  console.log(demoUrl, sectionUrls);
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 1,
    count: steps.length,
  });
  const {
    register,
    watch,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({ resolver: zodResolver(courseSchema) });
  const { auth } = useAuthContext();
  const [newToast] = useToastHook();
  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data);
      const file = await convertToBase64(data.thumbnail["0"]);
      const courseSectionPromises = data.courseSections.map(async (section) => {
        const thumbnail = await convertToBase64(section.videoThumbnail["0"]);
        return { ...section, videoThumbnail: thumbnail };
      });
      const courseSections = await Promise.all(courseSectionPromises);
      const courseSectionsUpdated =
        sectionUrls.length > 0 &&
        courseSections.map((section, index) => {
          return { ...section, videoURL: sectionUrls[index] };
        });
      console.log(courseSectionsUpdated);

      console.log(file);
      const reqData = {
        name: data.courseName,
        description: data.courseDescription,
        price: data.coursePrice,
        estimatedPrice: data.courseEstimatedPrice,
        thumbnail: file,
        tags: data.tags,
        level: data.level,
        demoUrl: demoUrl,
        benifits: data.courseBenifits,
        preRequisties: data.preRequirement,
        courseInfo: courseSectionsUpdated,
      };
      const response = await axios.post("/courses/create", reqData, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      console.log(response);
      newToast({ message: response.data.message, condition: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box width={"80vw"} mx={"auto"} mt={"20px"}>
      <CustomStepper steps={steps} activeStep={activeStep} />

      {activeStep <= 1 && (
        <Box padding={"20px"}>
          <Step1Form
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        </Box>
      )}
      {activeStep === 2 && (
        <Box padding={"20px"}>
          <Step2Form
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        </Box>
      )}
      {activeStep === 3 && (
        <Box padding={"20px"}>
          <Step3Form
            setDemoUrl={setDemoUrl}
            setSectionUrls={setSectionUrls}
            sectionUrls={sectionUrls}
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        </Box>
      )}
      <Flex direction={"row"} justifyContent={"space-between"} mt={"10px"}>
        <Button colorScheme="teal" onClick={goToPrevious} variant={"solid"}>
          Previous
        </Button>
        <Button
          colorScheme="teal"
          onClick={activeStep === 3 ? handleSubmit(onSubmit) : goToNext}
          disabled={activeStep === 3 ? isSubmitting : false}
          variant={"solid"}
        >
          {activeStep === 3 ? "Submit" : "Next"}
        </Button>
      </Flex>
    </Box>
  );
};

export default UploadCoursePage;

type FormProps = {
  demoUrl?: string;
  setDemoUrl?: Dispatch<SetStateAction<string>>;
  sectionUrls?: string[];
  setSectionUrls?: Dispatch<SetStateAction<string[]>>;
  index?: number;
  thumbnail?: string;
  control?: Control<FieldValues> | undefined;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
};

const Step1Form: FC<FormProps> = ({ register, errors, control }) => {
  return (
    <>
      <CustomTextInput
        errors={errors}
        register={register}
        name="courseName"
        placeholder="Enter course title"
        type="text"
        isRequired={false}
      >
        Course Title
      </CustomTextInput>
      <CustomTextInput
        errors={errors}
        register={register}
        name="courseDescription"
        placeholder="Provide a course description"
        type="text"
        isRequired={false}
      >
        Course Description
      </CustomTextInput>
      <CustomTextInput
        errors={errors}
        register={register}
        name="coursePrice"
        placeholder="Enter course price"
        type="text"
        isRequired={false}
      >
        Course Price
      </CustomTextInput>
      <CustomTextInput
        errors={errors}
        register={register}
        name="courseEstimatedPrice"
        placeholder="Enter estimated course price"
        type="text"
        isRequired={false}
      >
        Estimated Price
      </CustomTextInput>

      <CustomTextInput
        flushed={false}
        errors={errors}
        register={register}
        name="level"
        placeholder="Beginner | Intermidiate | Advanced"
        type="text"
        isRequired={false}
      >
        Expected level
      </CustomTextInput>
      <Addons
        title="Course tags"
        buttonTitle="Click to add course tags"
        control={control}
        errors={errors}
        fieldName={`tags`}
        propertyName="tag"
        placeHolder="Add tags here"
        register={register}
      />
    </>
  );
};
const Step2Form: FC<FormProps> = ({ register, control, errors }) => {
  return (
    <>
      <Addons
        title="Add Course Benifits"
        buttonTitle="Click to add benifit"
        control={control}
        errors={errors}
        fieldName={`courseBenifits`}
        propertyName="benifit"
        placeHolder="Add benifit here"
        register={register}
      />
      <Addons
        title="Add Pre-Requirements For The Course"
        buttonTitle="Click to add pre requirement"
        control={control}
        errors={errors}
        fieldName={`preRequirement`}
        propertyName="requirement"
        placeHolder="Add requirement here"
        register={register}
      />
    </>
  );
};

type AddonsType = {
  control: Control<FieldValues> | undefined;
  fieldName: string;
  title: string;
  placeHolder: string;
  buttonTitle: string;
  propertyName: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const Addons: FC<AddonsType> = ({
  fieldName,
  propertyName,
  title,
  control,
  placeHolder,
  register,
  buttonTitle,
  errors,
}) => {
  const { append, remove, fields } = useFieldArray({
    name: fieldName,
    control,
  });
  const color = useColorModeValue("gray.400", "gray.600");
  return (
    <Box
      mt={"5px"}
      padding={"20px"}
      border={"2px"}
      borderColor={errors[fieldName] ? "red.400" : color}
      borderRadius={"xl"}
    >
      <Text fontWeight={"semibold"}>{title}</Text>
      {fields.map((field, index) => (
        <Flex
          key={field.id}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CustomTextInput
            fieldName={fieldName}
            propertyName={propertyName}
            index={index}
            errors={errors}
            register={register}
            name={`${fieldName}.${index}.${propertyName}`}
            placeholder={placeHolder}
            type="text"
            isRequired={false}
          />
          <Button
            colorScheme="facebook"
            variant={"solid"}
            onClick={() => remove(index)}
          >
            Delete
          </Button>
        </Flex>
      ))}
      <Button
        mt={"5px"}
        colorScheme="facebook"
        variant={"solid"}
        onClick={() => append({ propertyName: "" })}
      >
        {buttonTitle}
      </Button>{" "}
      {errors[fieldName] && (
        <p className="tw-text-red-400 tw-text-sm">
          {errors[fieldName]?.message}
        </p>
      )}
    </Box>
  );
};

const Step3Form: FC<FormProps> = ({
  register,
  setDemoUrl,
  setSectionUrls,
  sectionUrls,
  errors,
  watch,
  setValue,
  control,
}) => {
  const { append, fields, remove } = useFieldArray({
    name: "courseSections",
    control: control,
  });
  const color = useColorModeValue("gray.400", "gray.600");
  return (
    <>
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
      {/* <CustomTextInput
        flushed={true}
        errors={errors}
        register={register}
        name="courseDemo"
        placeholder="Provide a demo video for the course"
        type="file"
        isRequired={false}
      >
        Course Demo video
      </CustomTextInput> */}
      <UploadWidget
        text={"Upload Course Demo video"}
        demo={true}
        setSectionUrls={setSectionUrls}
        sectionUrls={sectionUrls}
        setDemoUrl={setDemoUrl}
      />
      {fields.map((field, index) => (
        <Flex
          key={field.id}
          mt={"20px"}
          padding={"20px"}
          gap={"20px"}
          direction={"column"}
          width={"100%"}
          border={"2px"}
          borderColor={color}
          borderRadius={"xl"}
        >
          <Section
            setDemoUrl={setDemoUrl}
            setSectionUrls={setSectionUrls}
            sectionUrls={sectionUrls}
            key={field.id}
            index={index}
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <Button
            maxWidth={"200px"}
            colorScheme="facebook"
            variant={"solid"}
            onClick={() => remove(index)}
          >
            Delete Section
          </Button>
        </Flex>
      ))}
      <Flex justifyContent={"center"} direction={"column"} gap={"10px"}>
        <Button
          colorScheme="facebook"
          mt={"20px"}
          variant={"solid"}
          onClick={() => append({ section: "" })}
        >
          Click to add a Course Section
        </Button>
        {errors["courseSections"] && (
          <p className="tw-text-red-400 tw-text-sm">
            {errors["courseSections"]?.message}
          </p>
        )}
      </Flex>
    </>
  );
};

const Section: FC<FormProps> = ({
  register,
  errors,
  control,
  index,
  setDemoUrl,
  setSectionUrls,
  sectionUrls,
}) => {
  return (
    <>
      <Box>
        <CustomTextInput
          errors={errors}
          fieldName={"courseSections"}
          propertyName={"section"}
          index={index}
          register={register}
          name={`courseSections.${index}.section`}
          placeholder="Section title"
          type="text"
          isRequired={false}
        >
          Course section name
        </CustomTextInput>
        <CustomTextInput
          errors={errors}
          register={register}
          fieldName={"courseSections"}
          propertyName={"videoTitle"}
          index={index}
          name={`courseSections.${index}.videoTitle`}
          placeholder="Video title"
          type="text"
          isRequired={false}
        >
          Video title
        </CustomTextInput>
        <UploadWidget
          text={"Upload video"}
          demo={false}
          setSectionUrls={setSectionUrls}
          sectionUrls={sectionUrls}
          setDemoUrl={setDemoUrl}
        />
        <CustomTextInput
          errors={errors}
          register={register}
          fieldName={"courseSections"}
          propertyName={"videoDescription"}
          index={index}
          name={`courseSections.${index}.videoDescription`}
          placeholder="Video description"
          type="text"
          isRequired={false}
        >
          Video description
        </CustomTextInput>
        <CustomTextInput
          flushed={true}
          errors={errors}
          register={register}
          fieldName={"courseSections"}
          propertyName={"videoThumbnail"}
          index={index}
          name={`courseSections.${index}.videoThumbnail`}
          placeholder="Provide a thumbnail for the course"
          type="file"
          isRequired={false}
        >
          Thumbnail
        </CustomTextInput>
        <Addons
          title="Related Links"
          buttonTitle="Add links related to the video"
          control={control}
          errors={errors}
          fieldName={`courseSections.${index}.links`}
          propertyName="link"
          placeHolder="Add links here"
          register={register}
        />
      </Box>
    </>
  );
};
