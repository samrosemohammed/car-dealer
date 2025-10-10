"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Car,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ScheduleTestDriveButton = ({
  className,
  children,
  variant,
  onClick,
}) => {
  const handleClick = () => {
    // Call the onClick handler if provided
    if (onClick) onClick();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer",
            className
          )}
          size="lg"
          variant={variant || "default"}
          onClick={handleClick}
        >
          {children || "Schedule Test Drive"}
        </Button>
      </DialogTrigger>
      <ScheduleTestDriveDialog />
    </Dialog>
  );
};

export const ScheduleTestDriveDialog = ({ vehicles = [] }) => {
  // Default vehicles if none provided via props
  const defaultVehicles = [
    { id: "1", name: "911 Carrera", brand: "Porsche" },
    { id: "2", name: "Model S Plaid", brand: "Tesla" },
    { id: "3", name: "AMG GT", brand: "Mercedes-Benz" },
    { id: "4", name: "M4 Competition", brand: "BMW" },
    { id: "5", name: "R8 V10", brand: "Audi" },
    { id: "6", name: "F-Type R", brand: "Jaguar" },
    { id: "7", name: "Corvette Z06", brand: "Chevrolet" },
    { id: "8", name: "Taycan Turbo S", brand: "Porsche" },
  ];

  const availableVehicles = vehicles.length > 0 ? vehicles : defaultVehicles;
  const availableTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const [submissionStatus, setSubmissionStatus] = useState({
    submitted: false,
    success: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      vehicleId: "",
      date: undefined,
      time: "",
      message: "",
    },
    mode: "onChange",
  });

  const selectedDate = watch("date");
  const watchedFields = watch([
    "firstName",
    "lastName",
    "email",
    "phone",
    "vehicleId",
    "date",
    "time",
  ]);
  const allRequiredFieldsFilled =
    watchedFields[0]?.trim() !== "" && // firstName
    watchedFields[1]?.trim() !== "" && // lastName
    watchedFields[2]?.trim() !== "" && // email
    watchedFields[3]?.trim() !== "" && // phone
    watchedFields[4]?.trim() !== "" && // vehicleId
    !!watchedFields[5] && // date
    watchedFields[6]?.trim() !== ""; // time
  const onSubmit = (data) => {
    setSubmissionStatus({ submitted: true, success: false });

    // Simulate API call
    console.log("Form submitted with data:", data);
    setTimeout(() => {
      setSubmissionStatus({ submitted: true, success: true });
    }, 1500);
  };

  const resetForm = () => {
    reset();
    setSubmissionStatus({ submitted: false, success: false });
  };

  // Success message component
  const SuccessMessage = () => (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <CheckCircle className="h-16 w-16 text-primary mb-6" />
      <h3 className="text-2xl font-bold text-foreground mb-2">
        Test Drive Scheduled!
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Thank you for scheduling a test drive. A confirmation has been sent to
        your email. Our team will contact you shortly to confirm your
        appointment.
      </p>
      <DialogClose asChild>
        <Button
          onClick={resetForm}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Close
        </Button>
      </DialogClose>
    </div>
  );

  return (
    <DialogContent className="sm:max-w-[600px] md:max-w-[800px]">
      <DialogHeader>
        {!submissionStatus.success && (
          <>
            <DialogTitle className="text-2xl font-bold">
              Schedule a Test Drive
            </DialogTitle>
            <DialogDescription>
              Select a vehicle, date, and time that works for you.
            </DialogDescription>
          </>
        )}
      </DialogHeader>

      {submissionStatus.success ? (
        <SuccessMessage />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs defaultValue="schedule" className="mt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schedule">Vehicle</TabsTrigger>
              <TabsTrigger value="information">Information</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-4 pt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select a Vehicle<span className="text-destructive">*</span>
                </label>
                <Controller
                  name="vehicleId"
                  control={control}
                  rules={{ required: "Please select a vehicle" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.vehicleId && "border-destructive"
                        )}
                      >
                        <SelectValue placeholder="Choose a vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.brand} {vehicle.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.vehicleId && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.vehicleId.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select a Date<span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Please select a date" }}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                              errors.date && "border-destructive"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => {
                              // Disable past dates and Sundays
                              return (
                                date <
                                  new Date(new Date().setHours(0, 0, 0, 0)) ||
                                date.getDay() === 0
                              );
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.date && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select a Time<span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="time"
                    control={control}
                    rules={{ required: "Please select a time" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedDate}
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full",
                            errors.time && "border-destructive"
                          )}
                        >
                          <SelectValue placeholder="Choose a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.time && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes (Optional)
                </label>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      placeholder="Tell us about any specific features you'd like to explore or questions you have."
                      className="resize-none"
                      {...field}
                    />
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="information" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name<span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z\s\-']+$/,
                        message:
                          "First name can only contain letters, spaces, hyphens, and apostrophes",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        placeholder="First Name"
                        className={cn(errors.firstName && "border-destructive")}
                        {...field}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name<span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z\s\-']+$/,
                        message:
                          "Last name can only contain letters, spaces, hyphens, and apostrophes",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        placeholder="Last Name"
                        className={cn(errors.lastName && "border-destructive")}
                        {...field}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address<span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        className={cn(errors.email && "border-destructive")}
                        {...field}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number<span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      pattern: {
                        value:
                          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                        message: "Please enter a valid phone number",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className={cn(errors.phone && "border-destructive")}
                        {...field}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 pt-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    45-Minute Personalized Sessions
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Each test drive is scheduled for 45 minutes with a product
                    specialist who will showcase features most important to you.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={
                submissionStatus.submitted ||
                !isValid ||
                !allRequiredFieldsFilled
              }
            >
              {submissionStatus.submitted
                ? "Processing..."
                : "Schedule Test Drive"}
            </Button>
          </div>
        </form>
      )}
    </DialogContent>
  );
};

// For the standalone page
export const ScheduleTestDrive = ({ vehicles = [] }) => {
  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background to-background/90 opacity-80"></div>
      <div className="container mx-auto px-4 relative z-[200]">
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-sm font-medium uppercase tracking-wider">
              Experience the Drive
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            SCHEDULE A <span className="text-primary">TEST DRIVE</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feel the power and precision firsthand. Book your personalized test
            drive experience and discover the perfect vehicle for your
            lifestyle.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mx-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium">
              Book Your Test Drive
            </Button>
          </DialogTrigger>
          <ScheduleTestDriveDialog vehicles={vehicles} />
        </Dialog>
      </div>
    </section>
  );
};
