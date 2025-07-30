"use client";
import React from "react";
import { Sheet } from "@silk-hq/components";
import "./PageFromBottom.css";

// ================================================================================================
// Root
// ================================================================================================

const PageFromBottomRoot = React.forwardRef(function PageFromBottomRoot(props, ref) {
  return <Sheet.Root license="commercial" {...props} ref={ref}></Sheet.Root>;
});

// ================================================================================================
// View
// ================================================================================================

const PageFromBottomView = React.forwardRef(function PageFromBottomView(
  { children, className, ...restProps },
  ref
) {
  return (
    <Sheet.View
      className={`PageFromBottom-view ${className ?? ""}`.trim()}
      contentPlacement="bottom"
      swipe={false}
      nativeEdgeSwipePrevention={true}
      {...restProps}
      ref={ref}
    >
      {children}
    </Sheet.View>
  );
});

// ================================================================================================
// Backdrop
// ================================================================================================

const PageFromBottomBackdrop = React.forwardRef(function PageFromBottomBackdrop(
  { className, ...restProps },
  ref
) {
  return (
    <Sheet.Backdrop
      className={`PageFromBottom-backdrop ${className ?? ""}`.trim()}
      // Removed travelAnimation prop for compatibility
      {...restProps}
      ref={ref}
    />
  );
});

// ================================================================================================
// Content
// ================================================================================================

const PageFromBottomContent = React.forwardRef(function PageFromBottomContent(
  { children, className, ...restProps },
  ref
) {
  return (
    <Sheet.Content
      className={`PageFromBottom-content bg-white/95 rounded-t-2xl shadow-2xl p-6 md:p-10 max-w-lg mx-auto ${className ?? ""}`.trim()}
      {...restProps}
      ref={ref}
    >
      <div className="PageFromBottom-topBar flex justify-end mb-2">
        <Sheet.Trigger
          className="PageFromBottom-dismissTrigger text-gray-500 hover:text-gray-900 transition-colors rounded-full px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
          action="dismiss"
          aria-label="Close"
        >
          Close
        </Sheet.Trigger>
      </div>
      {children}
    </Sheet.Content>
  );
});

// ================================================================================================
// Unchanged Components
// ================================================================================================

const PageFromBottomPortal = Sheet.Portal;
const PageFromBottomTrigger = Sheet.Trigger;
const PageFromBottomHandle = Sheet.Handle;
const PageFromBottomOutlet = Sheet.Outlet;
const PageFromBottomTitle = Sheet.Title;
const PageFromBottomDescription = Sheet.Description;

export const PageFromBottom = {
  Root: PageFromBottomRoot,
  Portal: PageFromBottomPortal,
  View: PageFromBottomView,
  Backdrop: PageFromBottomBackdrop,
  Content: PageFromBottomContent,
  Trigger: PageFromBottomTrigger,
  Handle: PageFromBottomHandle,
  Outlet: PageFromBottomOutlet,
  Title: PageFromBottomTitle,
  Description: PageFromBottomDescription,
};