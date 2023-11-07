import * as DialogPrimitive from '@radix-ui/react-dialog'
import {DialogProps} from '@radix-ui/react-dialog'
import {Command as CommandPrimitive} from 'cmdk'
import * as React from 'react'
import {RiCloseCircleFill} from 'react-icons/ri'

import {AppIcon} from '@/components/app-icon'
import {Dialog} from '@/shadcn-components/ui/dialog'
import {cn} from '@/shadcn-lib/utils'

import {dialogContentClass, dialogOverlayClass} from './shared/dialog'

const Command = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({className, ...props}, ref) => (
	<CommandPrimitive ref={ref} className={cn('flex h-full w-full flex-col overflow-hidden', className)} {...props} />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({children, ...props}: CommandDialogProps) => {
	return (
		<Dialog {...props}>
			<BlurOverlay />
			<DialogPrimitive.Content
				className={cn(
					dialogContentClass,
					'top-[20%] translate-y-0 overflow-hidden p-[30px]',
					'w-full max-w-[calc(100%-40px)] sm:max-w-[700px]',
					'z-[999]',
				)}
			>
				<Command className='[&_[cmdk-group-heading]]:font-medium[&_[cmdk-group-heading]]:text-neutral-400 flex flex-col gap-5 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0'>
					{children}
				</Command>
			</DialogPrimitive.Content>
		</Dialog>
	)
}

const CommandInput = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Input>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({className, ...props}, ref) => (
	<div className='flex items-center px-3' cmdk-input-wrapper=''>
		<CommandPrimitive.Input
			ref={ref}
			className={cn(
				'flex w-full rounded-md bg-transparent p-2 text-15 font-medium -tracking-2 outline-none placeholder:text-white/25 disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		/>
		<CommandCloseButton />
	</div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({className, ...props}, ref) => (
	<CommandPrimitive.List
		ref={ref}
		className={cn('umbrel-fade-scroller-y max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
		{...props}
	/>
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Empty>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className='py-6 text-center text-sm' {...props} />)

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Group>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({className, ...props}, ref) => (
	<CommandPrimitive.Group
		ref={ref}
		className={cn(
			'overflow-hidden text-neutral-50 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-neutral-400',
			className,
		)}
		{...props}
	/>
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({className, ...props}, ref) => (
	<CommandPrimitive.Separator ref={ref} className={cn('-mx-1 h-px bg-white', className)} {...props} />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {icon?: string}
>(({className, icon, children, ...props}, ref) => (
	<CommandPrimitive.Item
		ref={ref}
		className={cn(
			'group relative flex cursor-default select-none items-center gap-3 rounded-8 p-2 text-15 font-medium -tracking-2 outline-none aria-selected:bg-white/4 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			className,
		)}
		{...props}
	>
		{icon && <AppIcon src={icon} size={36} className='rounded-8' />}
		{children}
		<CommandShortcut className='mr-1 hidden group-aria-selected:block'>↵</CommandShortcut>
	</CommandPrimitive.Item>
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({className, ...props}: React.HTMLAttributes<HTMLSpanElement>) => {
	return <span className={cn('ml-auto text-xs tracking-widest text-white/30', className)} {...props} />
}
CommandShortcut.displayName = 'CommandShortcut'

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
}

function ForwardedBlurOverlay(props: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
	return (
		<DialogPrimitive.DialogOverlay
			ref={ref}
			className={cn(dialogOverlayClass, 'z-[999] bg-black/30 backdrop-blur-xl contrast-more:backdrop-blur-none')}
		/>
	)
}

const BlurOverlay = React.forwardRef(ForwardedBlurOverlay)

const CommandCloseButton = () => (
	<DialogPrimitive.Close className='rounded-full opacity-30 outline-none ring-white/60 transition-opacity hover:opacity-40 focus-visible:opacity-40 focus-visible:ring-2'>
		<RiCloseCircleFill className='h-5 w-5' />
		<span className='sr-only'>Close</span>
	</DialogPrimitive.Close>
)
